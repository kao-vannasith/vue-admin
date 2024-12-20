<template>
    <v-data-table
    :search="search"
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
      v-model="valid"
    >
      <template v-slot:item._id="{ item }">
        <td>{{ item._id }}</td>
      </template>
      <template v-slot:item.image="{ item }">
        <v-img width="200" :src="item.image"></v-img>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>ລາຍການຄູ່ມື</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">
                <v-icon left>mdi mdi-plus-thick</v-icon>
                Add Product
              </v-btn>
            </template>
            <v-card v-model="valid">
              <v-toolbar class="text-h4" :color="formcolor" dark>{{
                formTitle
              }}</v-toolbar>
  
              <v-form ref="form">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="4">
                        <v-card class="mt-3">
                          <v-img
                            height="200"
                            :src="editedItem.image"
                            cover
                          ></v-img>
                        </v-card>
                        <v-col>
                          <v-textarea
                            label="Product Image"
                            outlined
                            rows="2"
                            :rules="[required]"
                            v-model="editedItem.image"
                          ></v-textarea>
                        </v-col>
                      </v-col>
                      <v-col cols="8">
                        <v-col>
                          <v-textarea
                            label="Product name"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="15"
                            :rules="[required]"
                            v-model="editedItem.title"
                          ></v-textarea>
                        </v-col>
                        <v-col>
                          <v-textarea
                            label="Product price (USD)"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="15"
                            :rules="[required]"
                            v-model="editedItem.price"
                          ></v-textarea>
                        </v-col>
                        <v-col>
                          <v-textarea
                            label="Product Description"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="15"
                            :rules="[required]"
                            v-model="editedItem.detail"
                          ></v-textarea>
                        </v-col>
                        <v-col>
                          <v-textarea
                            label="Product Imgreview"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="15"
                            :rules="[required]"
                            v-model="editedItem.imgreview"
                          ></v-textarea>
                        </v-col>
                      </v-col>
                      
                      <!-- <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          :rules="[required]"
                          v-model="editedItem.title"
                          label="Title"
                        ></v-text-field>
                      </v-col>
                      </v-col>
                    <v-col cols="12" sm="6" >
                        <v-textarea
                          label="Product Image"
                          auto-grow
                          outlined
                          rows="1"
                          row-height="15"
                          :rules="[required]"
                          v-model="editedItem.image"
                        ></v-textarea>
                        </v-col>
                      <v-col cols="12" sm="6" >
                        <v-textarea
                          label="Product name"
                          auto-grow
                          outlined
                          rows="1"
                          row-height="15"
                          :rules="[required]"
                          v-model="editedItem.title"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-textarea
                          label="Product price (USD)"
                          auto-grow
                          outlined
                          rows="1"
                          row-height="15"
                          :rules="[required]"
                          v-model="editedItem.price"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-textarea
                          label="Product Description"
                          auto-grow
                          outlined
                          rows="1"
                          row-height="15"
                          :rules="[required]"
                          v-model="editedItem.detail"
                        ></v-textarea>
                      </v-col> -->
                      <!-- <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          :rules="[required]"
                          v-model="editedItem.title"
                          label="Title"
                        ></v-text-field>
                      </v-col> -->
                      <!-- <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          :rules="[required]"
                          v-model="editedItem.image"
                          label="Image"
                        ></v-text-field>
                      </v-col> -->
                      <!-- 
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          :rules="[required]"
                          v-model="editedItem.price"
                          label="Price"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-textarea
                          :rules="[required]"
                          v-model="editedItem.detail"
                          name="input-7-1"
                          label="Detail"
                        ></v-textarea>
                      </v-col> -->
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-form>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="close"> Cancel </v-btn>
                <v-btn
                  v-if="editedIndex == -1"
                  color="success"
                  @click="addproduct"
                >
                  Save
                </v-btn>
                <v-btn v-else color="blue darken-1" text @click="updateProduct">
                  Update
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteProduct"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
          <v-col cols="auto">
            <v-dialog
              transition="dialog-top-transition"
              max-width="600"
              v-model="dialogDelete"
            >
              <template>
                <v-card>
                  <v-toolbar class="text-h4" color="error" dark
                    >Comfirm Delete</v-toolbar
                  >
                  <v-card-title class="text-h6"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions class="justify-end">
                    <v-btn text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="error" text @click="deleteProduct">OK</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="primary" @click="editItem(item)" class="mr-5">
          <v-icon left> mdi-pencil </v-icon>
          Edit
        </v-btn>
        <v-btn color="error" @click="deleteItem(item)">
          <v-icon left> mdi-delete </v-icon>
          Delete
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </template>
    <script>
  import axios from "axios";
  import validate from "../../../validate/validate";
  export default {
    validate: [validate],
    data: () => ({
      previewImage: "",
      invalid: true,
      title: "",
      titleRules: [
        (v) => !!v || "title is required",
        (v) => (v && v.length <= 10) || "Title must be less than 10 characters",
      ],
      image: "",
      imageRules: [
        (v) => !!v || "title is required",
        (v) => (v && v.length <= 10) || "Title must be less than 10 characters",
      ],
      price: "",
      priceRules: [
        (v) => !!v || "title is required",
        (v) => (v && v.length <= 10) || "Title must be less than 10 characters",
      ],
      detail: "",
      detailRules: [
        (v) => !!v || "title is required",
        (v) => (v && v.length <= 10) || "Title must be less than 10 characters",
      ],
  
      hi: [],
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "ລ/ດ", value: "image" },
        { text: "ໍໍຊື່", value: "title" },
        { text: "URL", value: "price" },
        { text: "ລົງທະບຽນ", value: "price" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        title: "",
        image: "",
        price: "",
        detail: "",
        imgreview: [],
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),
  
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? "New Item" : "Edit Item";
      },
      formcolor() {
        return this.editedIndex === -1 ? "success" : "primary";
      },
    },
  
    watch: {
      dialog(val) {
        val || this.close();
      },
      dialogDelete(val) {
        val || this.closeDelete();
      },
    },
    onSubmit() {
      if (!this.form) return;
  
      this.loading = true;
  
      setTimeout(() => (this.loading = false), 2000);
    },
  
    created() {
      axios
        .get("http://192.168.100.76:8080/products")
        .then((response) => (this.desserts = response.data));
      axios
        .get("http://192.168.100.76:8080/product")
        .then((response) => (this.hi = response.data));
    },
  
    methods: {
      validate() {
        this.$refs.form.validate();
      },
      addproduct() {
        if (this.$refs.form.validate()) {
          axios
            .post("http://192.168.100.76:8080/addproducts", {
              title: this.editedItem.title,
              image: this.editedItem.image,
              price: this.editedItem.price,
              detail: this.editedItem.detail,
              imgreview: this.editedItem.imgreview,
            })
            .then(() => {
              window.location.reload();
              this.dialog = false;
            });
        } else if (!this.$refs.form.validate()) {
          alert("Plase insert Information");
        }
        // axios
        //   .post("http://192.168.100.76:8080/addproducts", {
        //     title: this.editedItem.title,
        //     image: this.editedItem.image,
        //     price: this.editedItem.price,
        //     detail: this.editedItem.detail,
        //   })
        //   .then(() => {
        //     window.location.reload();
        //     this.dialog = false;
        //   });
      },
      updateProduct() {
        axios
          .put("http://192.168.100.76:8080/products/" + this.$route.query.id, {
            title: this.editedItem.title,
            image: this.editedItem.image,
            price: this.editedItem.price,
            detail: this.editedItem.detail,
          })
          .then(() => {
            this.$router.push({ query: {} });
            this.dialog = false;
            window.location.reload();
          });
      },
      deleteProduct() {
        axios
          .delete(
            "http://192.168.100.76:8080/products/" + this.$route.query.id,
            {}
          )
          .then(() => {
            this.$router.push({ query: {} });
            this.dialog = false;
            window.location.reload();
          });
      },
  
      editItem(item) {
        this.editedIndex = this.desserts.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
        this.$router.push({ query: { id: item._id } });
      },
  
      deleteItem(item) {
        this.editedIndex = this.desserts.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
        this.$router.push({ query: { id: item._id } });
      },
  
      deleteItemConfirm() {
        this.desserts.splice(this.editedIndex, 1);
        this.closeDelete();
      },
  
      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
        this.$router.push({ query: {} });
      },
  
      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
  
      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem);
        } else {
          this.desserts.push(this.editedItem);
        }
        this.close();
      },
      required(v) {
        return !!v || "Field is required";
      },
    },
  };
  </script>