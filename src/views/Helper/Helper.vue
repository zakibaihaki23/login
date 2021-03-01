<template>
  <div>
    <!-- {{ tableData }} -->
    <v-card>
      <v-data-table
        :mobile-breakpoint="0"
        :headers="table"
        :items="tableData"
        :items-per-page="10"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <div>
                Master Helper
              </div>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Create Helper
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row @keyup.enter="save">
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.phone_number"
                          label="Phone No"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.address"
                          label="Address"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.type"
                          label="Type"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.warehouse"
                          label="Warehouse"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.status"
                          label="Status"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-col class="d-flex" cols="3" sm="10">
            <v-select></v-select>
            <v-divider></v-divider>

            <v-select :item="table.name" label="Warehouse"></v-select>
            <v-divider></v-divider>

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </template>
        <template v-slot:item="props">
          <tr>
            <td>{{ props.item.code }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.phone_no }}</td>
            <td>{{ props.item.address }}</td>
            <td>{{ props.item.warehouse.warehouse_name }}</td>
            <td>
              <div v-if="props.item.status == 1">{{ 'Active' }}</div>
              <div v-else>{{ 'Inactive' }}</div>
            </td>

            <td>
              <v-menu offset-y>
                <template v-slot:activator="{ on: menu }">
                  <v-btn small class="mr-2" icon v-on="{ ...tooltip, ...menu }"
                    ><v-icon dark>mdi-dots-vertical</v-icon></v-btn
                  >
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>
                      Edit
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      Active
                    </v-list-item-title>
                  </v-list-item>
                  <router-view></router-view>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        search: '',
        edit: '',
        interval: null,
        table: [
          {
            text: 'Helper ID',
            value: 'code',
          },
          {
            text: 'Name',
            value: 'name',
          },
          {
            text: 'Phone No',
            value: 'phone_no',
          },
          {
            text: 'Address',
            value: 'address',
          },

          {
            text: 'Warehouse',
            value: 'warehouse.warehouse_name',
          },
          {
            text: 'Status',
            value: 'status',
          },
          {
            text: 'Actions',
            value: 'actions',
            sortable: false,
          },
        ],
        editData: [
          {
            text: 'Edit',
            value: 'edit',
          },
          {
            text: 'Inactive',
          },
        ],
        tableData: [],
        editedIndex: -1,
        editedItem: {
          name: '',
          total_author: '',
          address: '',
          type: '',
          warehouse: '',
          status: '',
        },
        defaultItem: {
          name: '',
          phone_number: '',
          address: '',
          type: '',
          warehouse: '',
          status: '',
        },
        listPrimitive: null,
      }
    },

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog(val) {
        val || this.close()
      },
      dialogDelete(val) {
        val || this.closeDelete()
      },
    },

    methods: {
      initialize() {
        this.tableData = [this.tableData]
      },
      renderData() {
        const token = localStorage.getItem('token')
        axios
          .get('v1/helper', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // let that = this;
            console.log(response.data.data)
            this.tableData = response.data.data
            if (this.tableData === null) {
              this.tableData = []
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      editItem(item) {
        this.editedIndex = this.tableData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        this.editedIndex = this.tableData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm() {
        this.tableData.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete() {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save() {
        axios
          .post('v1/helper', {
            id: this.editItem.id,
            name: this.editedItem.name,
            phone_number: this.editedItem.phone_number,
            address: this.editItem.address,
            order_complete: this.editedItem.order_complete,
            order_incomplete: this.editedItem.order_incomplete,
          })
          .then(function(response) {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
        // if (this.editedIndex > -1) {
        //   Object.assign(this.tableData[this.editedIndex], this.editedItem);
        // } else {
        //   this.tableData.push(this.editedItem);
        // }
        this.close()
      },
      aksi() {
        window.alert(JSON.stringify('HAII'))
      },
    },

    created() {
      this.renderData()
      this.initialize()
      // this.interval = setInterval(this.refreshData, 5000);
    },
    beforeDestroy() {
      clearInterval(this.interval)
    },
  }
</script>
