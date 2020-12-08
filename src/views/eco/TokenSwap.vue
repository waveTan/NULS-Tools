<template>
  <div class="tokenSwap w1200">
    <div class="top"></div>
    <div class="info">
      <div class="fl">
        <div class="title">
          <span style="color: #0ede94 ">买入</span>
          <el-button @click="showDialog(0)" class="fr" type="success" size="mini" round>挂买单</el-button>
        </div>

        <el-table :data="buyData" stripe style="width: 580px">
          <el-table-column prop="address" label="广告方" min-width="160">
          </el-table-column>
          <el-table-column label="数量" width="130">
            <template slot-scope="scope">
              {{scope.row.number}}(<span class="click">{{scope.row.token}}</span>)
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额" width="130">
          </el-table-column>
          <el-table-column label="操作" width="100" align="right">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" class="sell" type="text" size="small">出售</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">撤销</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="fr tl">
        <div class="title">
          <span class="fred">卖出</span>
          <el-button class="fr" type="danger" size="mini" round>挂卖单</el-button>
        </div>
        <el-table :data="sellData" stripe style="width: 580px">
          <el-table-column prop="address" label="广告方" min-width="160">
          </el-table-column>
          <el-table-column label="数量" width="130">
            <template slot-scope="scope">
              {{scope.row.number}}(<span class="click">{{scope.row.token}}</span>)
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额" width="130">
          </el-table-column>
          <el-table-column label="操作" width="100" align="right">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" class="buy" type="text" size="small">买入</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">撤销</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>

    <el-dialog title="买入Goblin" :visible.sync="buyOrSellDialog" class="token-dialog" width="50rem">
      <div class="fl">
        <ul>
          <li>广告方:<span class="click">NULSd6HgXNRbGv7iMsoRRA37fzyTukitrWAVe(wave)</span></li>
          <li>数量:<span>88888(Goblin)</span></li>
          <li>金额:<span>999999(NULS)</span></li>
          <li>合约地址:<span class="click">NULSd6HgXNRbGv7iMsoRRA37fzyTukitrWAVe</span></li>
          <li>合约创建地址:<span class="click">NULSd6HgXNRbGv7iMsoRRA37fzyTukitrWAVe(wave)</span></li>
        </ul>
      </div>
      <div class="fr">
        <el-form :model="tokenSwapForm" class="tokenSwap-form">
          <el-form-item label="账户">
            <el-input v-model="tokenSwapForm.fromAddress" autocomplete="off">
            </el-input>
          </el-form-item>
          <div class="balance">8888 <span class="fCN">NULS</span></div>
          <el-form-item label="资产">
            <el-select v-model="tokenSwapForm.assets" placeholder="" disabled>
              <el-option label="NULS" value="NULS"></el-option>
              <el-option label="Goblin" value="Goblin"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量(Goblin)">
            <el-input v-model="tokenSwapForm.number" autocomplete="off">
              <template slot="append">全部</template>
            </el-input>
          </el-form-item>
          <el-form-item label="金额(NULS)">
            <el-input v-model="tokenSwapForm.amount" autocomplete="off">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="cb"></div>
      <div slot="footer" class="dialog-footer tc">
        <el-button @click="buyOrSellDialog = false">取 消</el-button>
        <el-button type="primary" @click="buyOrSellDialog = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "token-swap",
    data() {
      return {
        buyData: [
          {address: 'dfsWd...34RWf(张三)', token: 'Goblin', tokenAdress: '', number: '100', amount: '500(NULS)'},
          {address: 'dfsWd...34RWf', token: 'Blackiron', tokenAdress: '', number: '10', amount: '50(NULS)'},
          {address: 'dfsWd...34RWf', token: 'tungsten', tokenAdress: '', number: '1000', amount: '1000(NULS)'},
          {address: 'dfsWd...34RWf', token: 'platinum', tokenAdress: '', number: '1220', amount: '100(NULS)'},
          {address: 'dfsWd...34RWf', token: 'obsidian', tokenAdress: '', number: '88', amount: '5(NULS)'},
        ],

        sellData: [
          {address: 'NULSd6...EtCara', token: 'platinum', tokenAdress: '', number: '22', amount: '100(NULS)'},
          {address: 'NULSd6...EtCara', token: 'obsidian', tokenAdress: '', number: '44', amount: '5(NULS)'},
          {address: 'NULSd6...EtCara', token: 'Goblin', tokenAdress: '', number: '888', amount: '500(NULS)'},
          {address: 'NULSd6...EtCara', token: 'Blackiron', tokenAdress: '', number: '666', amount: '50(NULS)'},
          {address: 'NULSd6...EtCara(wave)', token: 'tungsten', tokenAdress: '', number: '555', amount: '1000(NULS)'},
        ],

        buyOrSellDialog: false,//买、卖挂单弹框
        tokenSwapForm: {
          fromAddress: 'NULSd6HgUbMczB8cPQqNfEQa1w1nTU8TaCARA',
          assets: 'NULS',
          number: '100',
          amount: '333'
        },
      }
    },
    methods: {

      /**
       * @disc: 显示买卖弹框
       * @params: type （0：买单 1：卖单）
       * @params: info 买、卖单信息
       * @date: 2020-12-07 17:35
       * @author: Wave
       */
      showDialog(type, info = {}) {
        this.buyOrSellDialog = true;
      },
    }

  }
</script>

<style lang="less">
  .tokenSwap {
    .top {
      height: 5rem;
    }
    .info {
      .title {
        line-height: 2rem;
        height: 2rem;
        padding: 0;
        .el-button--mini {
          width: auto;
        }
      }
      .el-table td, .el-table th {
        padding: 0.4rem 0;
        .sell {
          span {
            color: #FF3300;
          }
        }
        .buy {
          span {
            color: #0ede94;
          }
        }
      }
    }

    .token-dialog {
      .fl {
        width: 21rem;
        border-right: 1px solid #A4AEC4;
        ul {
          li {
            height: 4rem;
            font-size: 12px;
            span {
              display: block;
            }
          }
        }
      }
      .fr {
        width: 25rem;
        .tokenSwap-form {
          .el-form-item {
            .el-form-item__label {
              line-height: 1rem;
              height: 1rem;
            }
            .el-form-item__content {
              .el-input {
                .el-input__inner {
                  height: 2rem;
                  line-height: 2rem;
                }
              }
              .el-select {
                width: 100%;
                .el-input {
                  width: 100%;
                }
              }
            }
          }
          .balance {
            display: block;
            position: absolute;
            right: 1.5rem;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
