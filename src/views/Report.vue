<template>
  <div class="common-layout">
    <Auth />
    <el-container>
      <el-header>
        <MainMenu />
      </el-header>
      <el-main>
        <div class="report">
          <div v-if="loadingTransaction">
            <el-skeleton :rows="5" />
          </div>
          <div v-else>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-select
                  class="select-primary pagination-select"
                  v-model="pagination.perPage"
                  placeholder="Per page"
                >
                  <el-option
                    class="select-primary"
                    v-for="item in pagination.perPageOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <div class="align-right">
                  <el-input
                    type="search"
                    class="mb-3"
                    clearable
                    prefix-icon="el-icon-search"
                    style="width: 200px"
                    placeholder="Search records"
                    v-model="searchQuery"
                    aria-controls="datatables"
                  >
                  </el-input>
                </div>
              </el-col>
            </el-row>

            <div class="table-responsive">
              <el-table
                :data="queriedData"
                row-key="id"
                header-row-class-name="thead-light"
                @selection-change="selectionChange"
              >
                <el-table-column
                  v-for="column in tableColumns"
                  :key="column.label"
                  v-bind="column"
                >
                </el-table-column>
                <el-table-column align="left" label="Transaction">
                  <template v-slot:default="props">
                    {{ props.row.transaction }}
                  </template>
                </el-table-column>
                <el-table-column align="left" label="User">
                  <template v-slot:default="props">
                    {{ props.row.user }}
                  </template>
                </el-table-column>
                <el-table-column align="left" label="Total">
                  <template v-slot:default="props">
                    {{ props.row.display_total }}
                  </template>
                </el-table-column>
                <el-table-column align="left" label="Date">
                  <template v-slot:default="props">
                    {{ props.row.display_date }}
                  </template>
                </el-table-column>
                <el-table-column align="left" label="Item">
                  <template v-slot:default="props">
                    <span v-html="props.row.display_product_detail"></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

          <div class="pagination">
            <div
              class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
              <div class="">
                <p class="card-category">
                  Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
                </p>
              </div>
              <base-pagination
                v-model="pagination.currentPage"
                class="pagination-no-border"
                :per-page="pagination.perPage"
                :total="total"
              >
              </base-pagination>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import {
  ElContainer,
  ElHeader,
  ElMain,
  ElSkeleton,
  ElTable,
  ElTableColumn,
  ElSelect,
  ElOption,
  ElInput,
  ElRow,
  ElCol,
} from "element-plus";
import MainMenu from "../components/MainMenu.vue";
import Auth from "../components/Auth.vue";
import BasePagination from "../components/BasePagination.vue";
export default {
  name: "Dashboard",
  components: {
    ElContainer,
    ElHeader,
    ElMain,
    ElTable,
    ElTableColumn,
    ElSelect,
    ElOption,
    ElInput,
    ElRow,
    ElCol,
    MainMenu,
    Auth,
    BasePagination,
  },
  computed: {
    pagedData() {
      return this.tableData.slice(this.from, this.to);
    },
    queriedData() {
      if (!this.searchQuery) {
        return this.pagedData;
      }
      return this.searchAction.slice(this.from, this.to);
    },
    searchAction() {
      let result = this.tableData.filter((row) => {
        let isIncluded = false;
        for (let key of this.propsToSearch) {
          if (row[key] !== null) {
            let rowValue = row[key].toString().toLowerCase();
            if (
              rowValue.includes &&
              rowValue.includes(this.searchQuery.toLowerCase())
            ) {
              isIncluded = true;
            }
          }
        }
        return isIncluded;
      });

      return result;
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchAction.length > 0
        ? this.searchAction.length
        : this.tableData.length;
    },
  },
  data() {
    return {
      transaction: [],
      urlTransaction: "/api/v1/transaction",
      loadingTransaction: false,

      dataTable: [],
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: [
        "display_date",
        "display_product_detail",
        "user",
        "total",
        "display_total",
      ],
      tableColumns: [
        {
          type: "selection",
        },
      ],
      datas: [],
      tableData: [],
      fuseSearch: null,
      searchedData: [],
    };
  },
  created() {
    this.getTransaction();
  },
  methods: {
    async getTransaction() {
      try {
        this.loadingTransaction = true;
        const response = await axios({
          method: "get",
          url: this.urlTransaction,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.data.status == "success") {
          this.transaction = response.data.data;
          this.datas = this.transaction;
          this.tableData = this.datas;

          this.loadingTransaction = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
