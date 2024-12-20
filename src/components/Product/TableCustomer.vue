<template>
    <v-card>
      <h1>ລາຍການລູກຄ້າ</h1>
      
      <v-card-title>
        
        <v-col
          class="d-flex"
          cols="2"
        >
          <v-select
            :items="items"
            label="ທັງໝົດ"
            outlined
          ></v-select>
        </v-col>
        <v-spacer></v-spacer>
        <v-row>
        <v-col
          cols="6"
          lg="4"
        >
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                label="Date"
             
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        
        </v-col>
  
        <v-col
          cols="12"
          lg="4"
        >
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedDateFormatted"
                label="Date (read only text field)"
               
                persistent-hint
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        
        </v-col>
      </v-row>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      ></v-data-table>
    </v-card>
  </template>
  <script>
    export default {
      data (vm) {
        return {
          date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
        menu1: false,
        menu2: false,
          search: '',
          items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
          headers: [
        { text: "ລ/ດ", value: "image" },
        { text: "ລະຫັດຜູ້ໃຊ້ງານ", value: "title" },
        { text: "ອີເມວ", value: "price" },
        { text: "ປະເພດຜູ້ໃຊ້", value: "image" },
        { text: "ປະເພດການຈ່າຍເງິນ", value: "title" },
        { text: "ລົງທະບຽນ", value: "price" },
        { text: "ຫມົດອາຍູ", value: "price" },
        { text: "Actions", value: "actions", sortable: false },
      ],
          desserts: [
            {
              name: 'Frozen Yogurt',
              calories: 159,
              fat: 6.0,
              carbs: 24,
              protein: 4.0,
              iron: 1,
            },
            {
              name: 'Ice cream sandwich',
              calories: 237,
              fat: 9.0,
              carbs: 37,
              protein: 4.3,
              iron: 1,
            },
            {
              name: 'Eclair',
              calories: 262,
              fat: 16.0,
              carbs: 23,
              protein: 6.0,
              iron: 7,
            },
            {
              name: 'Cupcake',
              calories: 305,
              fat: 3.7,
              carbs: 67,
              protein: 4.3,
              iron: 8,
            },
            {
              name: 'Gingerbread',
              calories: 356,
              fat: 16.0,
              carbs: 49,
              protein: 3.9,
              iron: 16,
            },
            {
              name: 'Jelly bean',
              calories: 375,
              fat: 0.0,
              carbs: 94,
              protein: 0.0,
              iron: 0,
            },
            {
              name: 'Lollipop',
              calories: 392,
              fat: 0.2,
              carbs: 98,
              protein: 0,
              iron: 2,
            },
            {
              name: 'Honeycomb',
              calories: 408,
              fat: 3.2,
              carbs: 87,
              protein: 6.5,
              iron: 45,
            },
            {
              name: 'Donut',
              calories: 452,
              fat: 25.0,
              carbs: 51,
              protein: 4.9,
              iron: 22,
            },
            {
              name: 'KitKat',
              calories: 518,
              fat: 26.0,
              carbs: 65,
              protein: 7,
              iron: 6,
            },
          ],
        }
      },
      computed: {
        computedDateFormatted () {
          return this.formatDate(this.date)
        },
      },
  
      watch: {
        date () {
          this.dateFormatted = this.formatDate(this.date)
        },
      },
      methods: {
        formatDate (date) {
          if (!date) return null
  
          const [year, month, day] = date.split('-')
          return `${month}/${day}/${year}`
        },
        parseDate (date) {
          if (!date) return null
  
          const [month, day, year] = date.split('/')
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
      },
    }
  </script>