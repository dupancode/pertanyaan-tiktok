const { createApp } = Vue

createApp({
  data() {
    return {
      nama: "",
      harga: "",
      stok: "",
      message: "",
      produk: [],
      showModal: false,
      selectedId: null,
      originalData: {},
    }
  },
  mounted() {
    this.getProduk()
  },
  methods: {
    getProduk() {
      axios.get('./endpoint/read.php').then(res => {
        if (res.data.status === 'success') {
          this.produk = res.data.data
        }
      })
    },
    create() {
      axios.post('./endpoint/create.php', {
        nama: this.nama,
        harga: this.harga,
        stok: this.stok
      }).then(res => {
        if (res.data.status === 'success') {
          this.message = "Produk berhasil ditambahkan"
          this.nama = ""
          this.harga = ""
          this.stok = ""
          this.getProduk()
        }
      })
    },
    openModal(item) {
      this.selectedId = item.id
      this.nama = item.nama
      this.harga = item.harga
      this.stok = item.stok
      this.originalData = { ...item }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.selectedId = null
      this.nama = ""
      this.harga = ""
      this.stok = ""
    },
    updateOrDelete() {
      if (
        this.nama !== this.originalData.nama ||
        this.harga !== this.originalData.harga ||
        this.stok !== this.originalData.stok
      ) {
        axios.post('./endpoint/update.php', {
          id: this.selectedId,
          nama: this.nama,
          harga: this.harga,
          stok: this.stok
        }).then(res => {
          if (res.data.status === 'success') {
            this.getProduk()
            this.closeModal()
          }
        })
      } else {
        axios.post('./endpoint/delete.php', { id: this.selectedId }).then(res => {
          if (res.data.status === 'success') {
            this.getProduk()
            this.closeModal()
          }
        })
      }
    }
  },
  template: `
    <div class="p-3">
      <h1 class="text-2xl font-bold mb-4">CRUD Produk</h1>

      <input v-model="nama" type="text" placeholder="Masukan nama produk" class="block mb-2 w-full p-2 border rounded" />
      <input v-model="harga" type="number" placeholder="Masukan harga produk" class="block mb-2 w-full p-2 border rounded" />
      <input v-model="stok" type="number" placeholder="Masukan stok produk" class="block mb-2 w-full p-2 border rounded" />
      <p class="my-3 text-sm text-green-600">{{ message }}</p>
      <button @click="create" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Tambah Produk</button>

      <hr class="my-6" />

      <table class="w-full table-auto border">
        <thead>
          <tr class="bg-gray-200">
            <th class="border px-4 py-2">Nama</th>
            <th class="border px-4 py-2">Harga</th>
            <th class="border px-4 py-2">Stok</th>
            <th class="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in produk" :key="item.id">
            <td class="border px-4 py-2">{{ item.nama }}</td>
            <td class="border px-4 py-2">{{ item.harga }}</td>
            <td class="border px-4 py-2">{{ item.stok }}</td>
            <td class="border px-4 py-2">
              <button @click="openModal(item)" class="text-blue-600 underline">Aksi</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded shadow w-80">
          <h2 class="text-lg font-bold mb-4">Edit Produk</h2>
          <input v-model="nama" type="text" class="w-full mb-2 p-2 border rounded" />
          <input v-model="harga" type="number" class="w-full mb-2 p-2 border rounded" />
          <input v-model="stok" type="number" class="w-full mb-4 p-2 border rounded" />

          <div class="flex justify-between">
            <button
              :class="nama !== originalData.nama || harga !== originalData.harga || stok !== originalData.stok
                      ? 'bg-yellow-500' : 'bg-red-500'"
              @click="updateOrDelete"
              class="text-white px-3 py-1 rounded">
              {{ nama !== originalData.nama || harga !== originalData.harga || stok !== originalData.stok ? 'Edit Produk' : 'Hapus Produk' }}
            </button>
            <button @click="closeModal" class="bg-gray-500 text-white px-3 py-1 rounded">Tutup</button>
          </div>
        </div>
      </div>
    </div>
  `
}).mount('#app')