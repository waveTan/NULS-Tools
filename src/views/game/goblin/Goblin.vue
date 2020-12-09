<template>
  <div class="goblin w1200" v-loading="goblinLoading">
    <div class="tc title">Goblin 助手</div>
    <el-table :data="addressList" row-key="address" style="width: 100%">
      <el-table-column label="地址" prop="addresss" align="center" width="150">
      </el-table-column>
      <!--<el-table-column label="别名" prop="alias" align="left" width="80">
      </el-table-column>-->
      <el-table-column label="备注" prop="note" align="center" width="80">
      </el-table-column>
      <el-table-column label="NULS" prop="balance" align="center" width="100">
      </el-table-column>
      <el-table-column label="goblin" prop="goblinBalance" align="center" width="100">
      </el-table-column>
      <el-table-column label="blackiron" prop="blackBalance" align="center" width="100">
      </el-table-column>
      <el-table-column label="tungsten" prop="tungstenBalance" align="center" width="100">
      </el-table-column>
      <el-table-column label="platinum" prop="platinumBalance" align="center" width="100">
      </el-table-column>
      <el-table-column label="obsidian" prop="obsidianBalance" align="center" width="100">
      </el-table-column>
      <el-table-column label="cobalt" prop="cobaltBalance" align="center" width="100">
      </el-table-column>
      <el-table-column label="军团" prop="myLegions" align="center" width="50">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        <template slot-scope="scope">
          <el-button @click="guiji(scope.row)" type="text" size="small">归集</el-button>
        </template>
      </el-table-column>
      <el-table-column type="expand" align="center">
        <template slot-scope="props">
          <div class="lis">
            <ul class="titles">
              <li class="fl">名称</li>
              <li class="fl">ID</li>
              <li class="fl">创建时间</li>
              <li class="fl" style="width: 9rem;">等级</li>
              <li class="fl">状态</li>
              <li class="fl">矿场</li>
              <li class="fl w100">待收获</li>
              <li class="fl w200">操作</li>
            </ul>

            <ul v-for="(item,index) of props.row.legionsData" :key="index" class="cb">
              <li class="fl">{{item.name}}</li>
              <li class="fl">{{item.tokenId}}</li>
              <li class="fl">{{item.createTime}}</li>
              <li class="fl" style="width: 9rem">
                {{item.level}}
                <el-tooltip placement="right" effect="light">
                  <div slot="content">{{item.levelInfo}}</div>
                  <span><i class="el-icon-question"></i></span>
                </el-tooltip>
                <!--<el-tooltip content="升级:65B-35P" placement="bottom" effect="light">
                  <el-button>{{item.level}}</el-button>
                </el-tooltip>-->
              </li>
              <li class="fl">{{item.status === 'mining' ? '挖矿':'空闲'}}</li>
              <li class="fl">{{item.place ==='def' ? '':item.place}}</li>
              <li class="fl w100">{{item.goblinBlack}}</li>
              <li class="fl w200">
                <el-button type="text" :disabled="item.status === 'mining'" @click="upgrade(item)">升级
                </el-button>
                <el-button type="text" :disabled="item.status === 'mining'" @click="sent(item)">派出
                </el-button>
                <el-button type="text" :disabled="item.status !== 'mining'" @click="acquire(item)">获取
                </el-button>
                <el-button type="text" :disabled="item.status !== 'mining'" @click="backs(item)">迁回
                </el-button>
                <!--<el-button type="text" :disabled="item.status !== 'mining'" @click="acquireAndBacks(item)">
                  获取并迁回
                </el-button>-->
              </li>
            </ul>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="归集" :visible.sync="guiDialog" class="guiji-dialog">
      <el-form :model="guijiForm" :rules="guijiRules" ref="guijiForm">
        <el-form-item label="from地址">
          <el-input v-model="guijiForm.fromAddress" disabled="disabled" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="资产" prop="assets">
          <el-select v-model="guijiForm.assets" placeholder="" @change="changeAssets">
            <el-option v-for="item in assetsList" :key="item.key"
                       :label="item.tokenName +'('+item.balances +')'"
                       :value="item.tokenName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="amount">
          <el-input v-model="guijiForm.amount">
            <!-- <template slot="append">全部</template>-->
          </el-input>
        </el-form-item>
        <el-form-item label="to地址" prop="toAddress">
          <el-select v-model="guijiForm.toAddress" placeholder="">
            <el-option v-for="(item,index) in addressList" :key="index"
                       :label="item.labels"
                       :value="item.address">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer tc">
        <el-button type="success" @click="startCollection('guijiForm')">开始归集</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择挖矿类型" :visible.sync="typeDialog">
      <div class="tc">
        <el-radio-group v-model="typeRadio">
          <el-radio :label="1">黑铁矿</el-radio>
          <el-radio :label="2" v-show="sentInfo.level >=10">钨矿</el-radio>
          <el-radio :label="3" v-show="sentInfo.level >=20">铂金矿</el-radio>
          <el-radio :label="4" v-show="sentInfo.level >=30">黑耀矿</el-radio>
          <el-radio :label="5" v-show="sentInfo.level >=40">钴矿</el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer tc" style="margin: 20px 0 0 0">
        <el-button type="success" @click="typeSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <Password ref="password" @passwordSubmit="passSubmit">
    </Password>
  </div>
</template>

<script>
  import nuls from 'nuls-sdk-js'
  import sdk from 'nuls-sdk-js/lib/api/sdk'
  import utils from 'nuls-sdk-js/lib/utils/utils'
  import moment from 'moment'
  import Password from '@/components/PasswordBar'
  import {chainInfo} from '@/config.js'
  import {
    divisionDecimals,
    timesDecimals,
    accountList,
    superLong,
    getArgs,
    Times,
    Plus,
    tofix,
    getLocalTime
  } from '@/api/util'
  import {
    countFee,
    inputsOrOutputs,
    validateAndBroadcast,
    passwordVerification,
    getBalanceOrNonceByAddress,
    //validateTx
  } from '@/api/requestData'

  export default {
    data() {
      return {
        addressList: [],//地址列表

        goblinAddress: 'NULSd6HgwJmD4SC1NAJXu8tC6NKsWs99P2jpw',//Goblin 合约地址
        goblinInfo: {},//Goblin 合约详情

        corpsAddress: 'NULSd6Hgkfuo4hKAN5ysFRVP8gynyYD5uRGGE',// 兵团合约地址(corps Contract)
        corpsInfo: {},//兵团合约详情

        NFTSendAddress: 'NULSd6HgoncSA11HYE1nQ2VLVu64XWfGHcsw6', // NFT Send合约地址
        NFTSendInfo: {},//NFT Send 合约详情

        NFTLevelUpAddress: 'NULSd6HgvnLGUGJ3JwMUmKJVDZbE4JjJeMbeQ', // NFT升级合约地址
        NFTLevelUpInfo: {},//NFT升级合约详情

        gainAddress: 'NULSd6HguK98JD4yFfjYkDTq8VXfPYDNeFMiL',//获取合约地址
        gainInfo: {},//获取合约详情

        blackIronAddress: 'NULSd6HgnScefpS1jGFvJZeNPnFRtAebwVpJr',//黑铁矿合约地址
        blackIronInfo: {},//黑铁矿合约详情

        tungstenAddress: 'NULSd6HgngWZE3u8WRe4QxCVcUiyGtDP7cGEU', //钨矿合约地址
        tungstenInfo: {},//钨矿合约详情

        platinumAddress: 'NULSd6Hgocjz53UsmRkGJuQiXz993S3vosu81',//铂金矿合约地址
        platinumInfo: {},//铂金矿合约详情

        obsidanAddress: 'NULSd6Hgyb8Tfy9vQcf1Z4QGqdRFkzfYR1M5o',//黑耀矿合约地址
        obsidanInfo: {},//黑耀矿合约详情

        cobaltAddress: 'NULSd6HgkFgtEhbvtFo7pUVRbD5GdHNGkgFUj',//钴矿合约地址
        cobaltInfo: {},//钴矿合约详情


        contractCallData: {},//调用合约data

        balanceInfo: {},//余额信息

        guiDialog: false,//归集弹框
        assetsList: [],//归集资产列表
        guijiForm: {
          fromAddress: '',
          assets: '',
          amount: '',
          toAddress: ''
        },
        guijiRules: {
          assets: [
            {required: true, message: '请选择归集资产', trigger: 'change'}
          ],
          amount: [
            {required: true, message: '请输入归集金额', trigger: 'blur'},
          ],
          toAddress: [
            {required: true, message: '请选择归集地址', trigger: 'change'}
          ],
        },

        sentInfo: {},//派出信息
        typeDialog: false,//选择矿池
        typeRadio: 1,//默认黑铁矿

        goblinSetInterval: null,//定时器
        goblinLoading: true,//加载动画
      };
    },
    components: {
      Password,
    },
    created() {
      //this.addressList = accountList(0);
      this.init();
    },
    mounted() {
      setTimeout(() => {
        this.getAddressList();
      }, 500)
      this.goblinSetInterval = setInterval(() => {
        this.getAddressList();
      }, 10000);
    },
    beforeDestroy() {
      //离开界面清除定时器
      clearInterval(this.goblinSetInterval);
    },
    methods: {

      //初始化
      async init() {
        let resDataGain = await this.contractInfoByAddress(this.gainAddress);
        if (resDataGain.success) {
          this.gainInfo = resDataGain.data;
        }

        let resDataCorps = await this.contractInfoByAddress(this.corpsAddress);
        if (resDataCorps.success) {
          this.corpsInfo = resDataCorps.data;
        }

        let resDataNFTSend = await this.contractInfoByAddress(this.NFTSendAddress);
        if (resDataNFTSend.success) {
          this.NFTSendInfo = resDataNFTSend.data;
        }

        let resDataNFTLevelUp = await this.contractInfoByAddress(this.NFTLevelUpAddress);
        if (resDataNFTLevelUp.success) {
          this.NFTLevelUpInfo = resDataNFTLevelUp.data;
        }

      },

      /**
       * 获取账户列表
       */
      async getAddressList() {
        let newAddressData = accountList(0);
        for (let item of newAddressData) {
          item.addresss = superLong(item.address, 6);

          if (!item.note || item.note.toString() === 'undefined') {
            item.note = '';
            item.labels = item.address;
          } else {
            item.labels = item.address + '(' + item.note + ')';
          }

          let addressInfo = await this.getAddressInfoByNode(item.address);
          if (addressInfo.success) {
            item.balance = parseFloat(tofix(divisionDecimals(addressInfo.data.balance), 4, -1));
            let tokenList = await this.getTokenListByAddress(item.address);
            item.tokens = tokenList.data.list;
            for (let k of addressInfo.data.tokens) {
              let newArr = k.split(',');
              //console.log(newArr);
              if (newArr[1] === 'Goblin' && newArr[0] === 'NULSd6HgwJmD4SC1NAJXu8tC6NKsWs99P2jpw') {
                let goblinInfo = tokenList.data.list.filter(obj => obj.tokenName === newArr[1]);
                item.goblinBalance = parseFloat(tofix(divisionDecimals(goblinInfo[0].balance, goblinInfo[0].decimals), 4, -1));
              } else if (newArr[1] === 'black_iron') {
                let blackInfo = tokenList.data.list.filter(obj => obj.tokenName === newArr[1]);
                item.blackBalance = parseFloat(tofix(divisionDecimals(blackInfo[0].balance, blackInfo[0].decimals), 4, -1));
              } else if (newArr[1] === 'tungsten') {
                let blackInfo = tokenList.data.list.filter(obj => obj.tokenName === newArr[1]);
                item.tungstenBalance = parseFloat(tofix(divisionDecimals(blackInfo[0].balance, blackInfo[0].decimals), 4, -1));
              } else if (newArr[1] === 'platinum') {
                let blackInfo = tokenList.data.list.filter(obj => obj.tokenName === newArr[1]);
                item.platinumBalance = parseFloat(tofix(divisionDecimals(blackInfo[0].balance, blackInfo[0].decimals), 4, -1));
              } else if (newArr[1] === 'obsidan') {
                let blackInfo = tokenList.data.list.filter(obj => obj.tokenName === newArr[1]);
                item.obsidianBalance = parseFloat(tofix(divisionDecimals(blackInfo[0].balance, blackInfo[0].decimals), 4, -1));
              } else if (newArr[1] === 'cobalt') {
                let blackInfo = tokenList.data.list.filter(obj => obj.tokenName === newArr[1]);
                item.cobaltBalance = parseFloat(tofix(divisionDecimals(blackInfo[0].balance, blackInfo[0].decimals), 4, -1));
              }
            }
          }

          let name = 'getRolesList';
          let methodsInfo = this.corpsInfo.methods.filter(obj => obj.name === name);
          let desc = methodsInfo[0].desc;
          methodsInfo[0].params[0].value = item.address;
          let newArgs = getArgs(methodsInfo[0].params);
          let myLegionsRes = await this.methodCall(this.corpsAddress, name, desc, newArgs.args);
          if (myLegionsRes.success) {
            item.myLegions = JSON.parse(myLegionsRes.data.result).length;
            item.legionsData = JSON.parse(myLegionsRes.data.result);
            for (let q of item.legionsData) {
              //console.log(q);
              q.levelInfo = await this.upgradeInfo(Number(q.level));
              q.address = item.address;
              q.createTime = moment(getLocalTime(q.birthday * 1000)).format('MM-DD HH:mm');
              let nameTwo = 'earnedOf';
              let methodsInfoTwo = this.gainInfo.methods.filter(obj => obj.name === nameTwo);
              let descTwo = methodsInfoTwo[0].desc;
              methodsInfoTwo[0].params[0].value = q.place;
              methodsInfoTwo[0].params[1].value = item.address;
              let newArgsTwo = getArgs(methodsInfoTwo[0].params);
              let resData = await this.methodCall(this.gainAddress, nameTwo, descTwo, newArgsTwo.args);
              if (resData.success) {
                let goblin = divisionDecimals(JSON.parse(resData.data.result)[0]).toString();
                let black = divisionDecimals(JSON.parse(resData.data.result)[1]).toString();
                q.goblinBlack = tofix(goblin, 2, -1) + '(GOBLIN)' + ' - ' + tofix(black, 2, -1) + '(' + q.place + ')';
              }
            }
          }
        }
        this.addressList = newAddressData;
        this.goblinLoading = false;
      },

      /**
       * @disc: 升级条件
       * @params: level
       * @date: 2020-12-01 17:11
       * @author: Wave
       */
      upgradeInfo(level) {
        //console.log(level);
        let levelInfo = '';
        switch (level) {
          case 1:
            levelInfo = '44 blackiron';
            break;
          case 2:
            levelInfo = '59 blackiron';
            break;
          case 3:
            levelInfo = '73 blackiron';
            break;
          case 4:
            levelInfo = '86 blackiron';
            break;
          case 5:
            levelInfo = '98 blackiron';
            break;
          case 6:
            levelInfo = '110 blackiron';
            break;
          case 7:
            levelInfo = '121 blackiron';
            break;
          case 8:
            levelInfo = '132 blackiron';
            break;
          case 9:
            levelInfo = '142 blackiron';
            break;
          case 10:
            levelInfo = '60 blackiron - 60 tungsten';
            break;
          case 11:
            levelInfo = '62 blackiron - 62 tungsten';
            break;
          case 12:
            levelInfo = '65 blackiron - 65 tungsten';
            break;
          case 13:
            levelInfo = '68 blackiron - 68 tungsten';
            break;
          case 14:
            levelInfo = '71 blackiron - 71 tungsten';
            break;
          case 15:
            levelInfo = '73 blackiron - 73 tungsten';
            break;
          case 16:
            levelInfo = '76 blackiron - 76 tungsten';
            break;
          case 17:
            levelInfo = '78 blackiron - 78 tungsten';
            break;
          case 18:
            levelInfo = '81 blackiron - 91 tungsten';
            break;
          case 19:
            levelInfo = '83 tungsten';
            break;
          case 20:
            levelInfo = '48 tungsten - 48 platinum';
            break;
          case 21:
            levelInfo = '50 tungsten - 50 platinum';
            break;
          case 22:
            levelInfo = '51 tungsten - 51 platinum';
            break;
          case 23:
            levelInfo = '52 tungsten - 52 platinum';
            break;
          case 24:
            levelInfo = '53 tungsten - 53 platinum';
            break;
          case 25:
            levelInfo = '54 tungsten - 54 platinum';
            break;
          case 26:
            levelInfo = '56 tungsten - 56 platinum';
            break;
          case 27:
            levelInfo = '57 tungsten - 57 platinum';
            break;
          case 28:
            levelInfo = '58 tungsten - 58 platinum';
            break;
          case 29:
            levelInfo = '59 platinum';
            break;
          case 30:
            levelInfo = '31 platinum - 31 obsidan';
            break;
          case 31:
            levelInfo = '32 platinum - 32 obsidan';
            break;
          case 32:
            levelInfo = '32 platinum - 32 obsidan';
            break;
          case 33:
            levelInfo = '33 platinum - 33 obsidan';
            break;
          case 34:
            levelInfo = '33 platinum - 33 obsidan';
            break;
          case 35:
            levelInfo = '34 platinum - 34 obsidan';
            break;
          case 36:
            levelInfo = '34 platinum - 34 obsidan';
            break;
          case 37:
            levelInfo = '35 platinum - 35 obsidan';
            break;
          case 38:
            levelInfo = '35 platinum - 35 obsidan';
            break;
          case 39:
            levelInfo = '36 obsidan';
            break;
          case 40:
            levelInfo = '21 obsidan - 21 cobalt';
            break;
          case 41:
            levelInfo = '21 obsidan - 21 cobalt';
            break;
          case 42:
            levelInfo = '21 obsidan - 21 cobalt';
            break;
          case 43:
            levelInfo = '21 obsidan - 21 cobalt';
            break;
          case 44:
            levelInfo = '22 obsidan - 22 cobalt';
            break;
          case 45:
            levelInfo = '22 obsidan - 22 cobalt';
            break;
          case 46:
            levelInfo = '22 obsidan - 22 cobalt';
            break;
          case 47:
            levelInfo = '22 obsidan - 22 cobalt';
            break;
          case 48:
            levelInfo = '23 obsidan - 23 cobalt';
            break;
          case 49:
            levelInfo = '23 obsidan - 23 cobalt';
            break;
          case 50:
            levelInfo = '23 obsidan - 23 cobalt';
            break;
          case 51:
            levelInfo = '23 obsidan - 23 cobalt';
            break;
          case 52:
            levelInfo = '24 obsidan - 24 cobalt';
            break;
          case 53:
            levelInfo = '24 obsidan - 24 cobalt';
            break;
          case 54:
            levelInfo = '24 obsidan - 24 cobalt';
            break;
          case 55:
            levelInfo = '24 obsidan - 24 cobalt';
            break;
          case 56:
            levelInfo = '25 obsidan - 25 cobalt';
            break;
          case 57:
            levelInfo = '25 obsidan - 25 cobalt';
            break;
          case 58:
            levelInfo = '25 obsidan - 25 cobalt';
            break;
          case 59:
            levelInfo = '25 cobalt';
            break;
          default:
            levelInfo = '最高级了，封顶了';
        }
        return levelInfo
      },

      /**
       * 获取地址网络信息
       * @param address
       **/
      async getAddressInfoByNode(address) {
        return await this.$post('/', 'getAccount', [address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              return {success: true, data: response.result}
            } else {
              return {success: false, data: response}
            }
          })
          .catch((error) => {
            return {success: false, data: error}
          });
      },

      /**
       * 获取地址代币资产信息
       * @param pageSize
       * @param pageRows
       * @param address
       **/
      async getTokenListByAddress(address, pageSize = 1, pageRows = 100) {
        return await this.$post('/', 'getAccountTokens', [pageSize, pageRows, address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              return {success: true, data: response.result}
            } else {
              return {success: false, data: response}
            }
          })
          .catch((error) => {
            return {success: false, data: error}
          });
      },

      /**
       * 获取合约详情根据合约地址
       * @param address
       **/
      async contractInfoByAddress(address) {
        return await this.$post('/', 'getContract', [address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              //this.contractInfo = response.result;
              return {success: true, data: response.result}
            } else {
              return {success: false, data: response}
            }
          })
          .catch((error) => {
            return {success: false, data: error}
          });
      },

      /**
       * 不上链方法调用
       * @param contractAddress
       * @param methodName
       * @param methodDesc
       * @param args
       */
      async methodCall(contractAddress, methodName, methodDesc, args) {
        //console.log(contractAddress, methodName, methodDesc, args);
        return await this.$post('/', 'invokeView', [contractAddress, methodName, methodDesc, args])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              return {success: true, data: response.result}
            } else {
              return {success: false, data: response}
            }
          })
          .catch((error) => {
            return {success: false, data: error}
          });
      },

      /**
       * @disc: 选择资产
       * @params:
       * @date: 2020-11-18 17:30
       * @author: Wave
       */
      async changeAssets(e) {
        //console.log(e);
        let newAssetsInfo = this.assetsList.filter(obj => obj.tokenName === e);
        //console.log(newAssetsInfo);
        this.guijiForm.amount = newAssetsInfo[0].balances;

        if (newAssetsInfo[0].tokenName === 'Goblin' && !this.goblinInfo.methods) {
          let resDataGoblin = await this.contractInfoByAddress(this.goblinAddress);
          if (resDataGoblin.success) {
            this.goblinInfo = resDataGoblin.data;
          }
        } else if (newAssetsInfo[0].tokenName === 'black_iron' && !this.blackIronInfo.methods) {
          let resDataBlackIron = await this.contractInfoByAddress(this.blackIronAddress);
          if (resDataBlackIron.success) {
            this.blackIronInfo = resDataBlackIron.data;
          }
        } else if (newAssetsInfo[0].tokenName === 'tungsten' && !this.tungstenInfo.methods) {
          let resDataTungsten = await this.contractInfoByAddress(this.tungstenAddress);
          if (resDataTungsten.success) {
            this.tungstenInfo = resDataTungsten.data;
          }
        } else if (newAssetsInfo[0].tokenName === 'platinum' && !this.platinumInfo.methods) {
          let resDataPlatinum = await this.contractInfoByAddress(this.platinumAddress);
          if (resDataPlatinum.success) {
            this.platinumInfo = resDataPlatinum.data;
          }
        } else if (newAssetsInfo[0].tokenName === 'obsidan' && !this.obsidanInfo.methods) {
          let resDataObsidan = await this.contractInfoByAddress(this.obsidanAddress);
          if (resDataObsidan.success) {
            this.obsidanInfo = resDataObsidan.data;
          }
        } else if (newAssetsInfo[0].tokenName === 'cobalt' && !this.cobaltInfo.methods) {
          let resDataCobalt = await this.contractInfoByAddress(this.cobaltAddress);
          if (resDataCobalt.success) {
            this.cobaltInfo = resDataCobalt.data;
          }
        }
      },

      /**
       * @disc: guiji
       * @params:
       * @date: 2020-11-18 15:09
       * @author: Wave
       */
      async guiji(rowInfo) {
        //console.log(rowInfo);
        this.guiDialog = true;
        this.guijiForm.assets = '';
        this.guijiForm.amount = '';
        this.guijiForm.toAddress = '';
        this.guijiForm.fromAddress = rowInfo.address;
        this.assetsList = [];
        for (let item of rowInfo.tokens) {
          //console.log(item);
          item.balances = divisionDecimals(item.balance, item.decimals).toString();
          if (item.tokenName === 'Goblin' && item.contractAddress === 'NULSd6HgwJmD4SC1NAJXu8tC6NKsWs99P2jpw') {
            this.assetsList.push(item)
          } else if (item.tokenName === 'black_iron') {
            this.assetsList.push(item)
          } else if (item.tokenName === 'tungsten') {
            this.assetsList.push(item)
          } else if (item.tokenName === 'platinum') {
            this.assetsList.push(item)
          } else if (item.tokenName === 'obsidan') {
            this.assetsList.push(item)
          } else if (item.tokenName === 'cobalt') {
            this.assetsList.push(item)
          }
        }
        //console.log(this.assetsList);
        if (this.assetsList.length !== 0) {
          this.guijiForm.assets = this.assetsList[0].tokenName;
          this.guijiForm.amount = this.assetsList[0].balances;
          this.changeAssets(this.guijiForm.assets);
          this.guijiForm.toAddress = this.addressList[0].address;
        }

      },

      /**
       * @disc: 开始归集
       * @params:
       * @date: 2020-11-18 16:25
       * @author: Wave
       */
      startCollection(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let contractInfo = {};
            let contractAddress = '';
            //console.log(this.guijiForm.assets);
            if (this.guijiForm.assets === 'Goblin') {
              contractInfo = this.goblinInfo;
              contractAddress = this.goblinAddress
            } else if (this.guijiForm.assets === 'black_iron') {
              contractInfo = this.blackIronInfo;
              contractAddress = this.blackIronAddress
            } else if (this.guijiForm.assets === 'tungsten') {
              contractInfo = this.tungstenInfo;
              contractAddress = this.tungstenAddress
            } else if (this.guijiForm.assets === 'platinum') {
              contractInfo = this.platinumInfo;
              contractAddress = this.platinumAddress
            } else if (this.guijiForm.assets === 'obsidan') {
              contractInfo = this.obsidanInfo;
              contractAddress = this.obsidanAddress
            } else if (this.guijiForm.assets === 'cobalt') {
              contractInfo = this.cobaltInfo;
              contractAddress = this.cobaltAddress
            }

            let name = 'transfer';
            let methodsInfo = contractInfo.methods.filter(obj => obj.name === name);
            //console.log(methodsInfo[0]); contractAddressTungsten
            methodsInfo[0].params[0].value = this.guijiForm.toAddress;
            methodsInfo[0].params[1].value = Number(timesDecimals(this.guijiForm.amount, contractInfo.decimals));
            let newArgs = getArgs(methodsInfo[0].params);
            this.chainMethodCall(this.guijiForm.fromAddress, methodsInfo[0], contractAddress, 0, newArgs);
            this.getBalanceByAddress(chainInfo.chainId, 1, this.guijiForm.fromAddress);
            this.$refs.password.showPassword(true, this.guijiForm.fromAddress);

          } else {
            return false;
          }
        });

      },

      /**
       * @disc:升级
       * @params:
       * @date: 2020-11-18 17:47
       * @author: Wave
       */
      upgrade(info) {
        //console.log(info);
        let name = 'upgrade';
        let methodsInfo = this.NFTLevelUpInfo.methods.filter(obj => obj.name === name);
        //console.log(methodsInfo[0].params);
        methodsInfo[0].params[0].value = info.tokenId;
        let newArgs = getArgs(methodsInfo[0].params);
        this.chainMethodCall(info.address, methodsInfo[0], this.NFTLevelUpAddress, 0, newArgs);
        this.getBalanceByAddress(chainInfo.chainId, 1, info.address);
        this.$refs.password.showPassword(true, info.address);
      },

      /**
       * @disc: 派出
       * @params:
       * @date: 2020-11-18 17:47
       * @author: Wave
       */
      sent(info) {
        //console.log(info);
        this.sentInfo = info;
        if (Number(info.level) >= 10) {
          this.typeDialog = true;
        } else {
          this.typeSubmit()
        }
      },

      /**
       * @disc: 选择类型提交
       * @params:
       * @date: 2020-11-18 18:33
       * @author: Wave
       */
      typeSubmit() {
        let name = 'sendToCave'; //sendToCave
        let methodsInfo = this.NFTSendInfo.methods.filter(obj => obj.name === name);
        //console.log(methodsInfo[0]);
        methodsInfo[0].params[0].value = this.sentInfo.tokenId;
        methodsInfo[0].params[1].value = 'BlackIron';
        methodsInfo[0].params[2].value = '1';
        if (this.typeRadio === 1) {
          methodsInfo[0].params[1].value = 'BlackIron';
        } else if (this.typeRadio === 2) {
          methodsInfo[0].params[1].value = 'Tungsten';
        } else if (this.typeRadio === 3) {
          methodsInfo[0].params[1].value = 'Platinum';
        } else if (this.typeRadio === 4) {
          methodsInfo[0].params[1].value = 'Obsidian';
        } else if (this.typeRadio === 5) {
          methodsInfo[0].params[1].value = 'Cobalt';
        }
        let newArgs = getArgs(methodsInfo[0].params);
        this.chainMethodCall(this.sentInfo.address, methodsInfo[0], this.NFTSendAddress, 0, newArgs);
        this.getBalanceByAddress(chainInfo.chainId, 1, this.sentInfo.address);
        this.$refs.password.showPassword(true, this.sentInfo.address);
        this.typeDialog = false;
      },

      /**
       * @disc: 获取
       * @params:
       * @date: 2020-11-18 11:45
       * @author: Wave
       */
      async acquire(info) {
        //console.log(info);
        let name = 'claimEarned';
        let methodsInfo = this.gainInfo.methods.filter(obj => obj.name === name);
        //console.log(methodsInfo[0].params);
        methodsInfo[0].params[0].value = info.place;
        let newArgs = getArgs(methodsInfo[0].params);
        this.chainMethodCall(info.address, methodsInfo[0], this.gainAddress, 0, newArgs);
        this.getBalanceByAddress(chainInfo.chainId, 1, info.address);
        this.$refs.password.showPassword(true, info.address);
        //let resData = await this.chainMethodCall(info.address, methodsInfo[0], this.contractAddressBlackIron, values);
        //console.log(resData);
      },

      /**
       * @disc: 迁回
       * @params:
       * @date: 2020-11-18 11:45
       * @author: Wave
       */
      async backs(info) {
        //console.log(info);
        let name = 'dismissFromCave';
        let methodsInfo = this.NFTSendInfo.methods.filter(obj => obj.name === name);
        methodsInfo[0].params[0].value = info.tokenId;
        methodsInfo[0].params[1].value = info.place;
        methodsInfo[0].params[2].value = info.mark;
        let newArgs = getArgs(methodsInfo[0].params);
        this.chainMethodCall(info.address, methodsInfo[0], this.NFTSendAddress, 0, newArgs);
        this.getBalanceByAddress(chainInfo.chainId, 1, info.address);
        this.$refs.password.showPassword(true, info.address);
      },

      /**
       * @disc: 获取并迁回
       * @params:
       * @date: 2020-11-19 17:35
       * @author: Wave
       */
      acquireAndBacks(info) {
        //console.log(info);
        let name = 'remandAllFromMine';
        /*console.log(this.contractInfo);
        console.log(this.contractAddress);*/
        let methodsInfo = this.contractInfo.methods.filter(obj => obj.name === name);
        //console.log(methodsInfo[0]);
        methodsInfo[0].params[0].value = this.contractAddressBlackIron;
        methodsInfo[0].params[1].value = info.caveType;
        let newArgs = getArgs(methodsInfo[0].params);
        this.chainMethodCall(info.address, methodsInfo[0], this.contractAddress, 0, newArgs);
        this.getBalanceByAddress(chainInfo.chainId, 1, info.address);
        this.$refs.password.showPassword(true, info.address);
      },

      /**
       * 上链方法调用
       */
      chainMethodCall(address, methodsInfo, contractAddress, values, newArgs) {
        //console.log(address, methodsInfo, contractAddress, values, newArgs);
        if (methodsInfo.params.length !== 0) { //有参数
          if (newArgs.allParameter) {
            this.validateContractCall(address, Number(Times(values, 100000000)), sdk.CONTRACT_MAX_GASLIMIT, sdk.CONTRACT_MINIMUM_PRICE, contractAddress, methodsInfo.name, methodsInfo.desc, newArgs.args);
          }
        } else { //没参数
          this.validateContractCall(address, Number(Times(values, 100000000)), sdk.CONTRACT_MAX_GASLIMIT, sdk.CONTRACT_MINIMUM_PRICE, contractAddress, methodsInfo.name, methodsInfo.desc, newArgs);
        }
      },

      /**
       * 验证调用合约交易
       * @param sender
       * @param value
       * @param gasLimit
       * @param price
       * @param contractAddress
       * @param methodName
       * @param methodDesc
       * @param args
       */
      async validateContractCall(sender, value, gasLimit, price, contractAddress, methodName, methodDesc, args) {
        return await this.$post('/', 'validateContractCall', [sender, value, gasLimit, price, contractAddress, methodName, methodDesc, args])
          .then((response) => {
            //console.log(response);
            if (response.result.success) {
              //return {success: true, data: response.result};
              this.imputedContractCallGas(sender, value, contractAddress, methodName, methodDesc, args)
            } else {
              this.$message({
                message: this.$t('tips.tips26') + response.result.msg,
                type: 'error',
                duration: 3000
              });
            }
          })
          .catch((error) => {
            this.$message({message: this.$t('call.call7') + error, type: 'error', duration: 3000});
          });
      },

      /**
       * 预估调用合约交易的gas
       * @param sender
       * @param value
       * @param contractAddress
       * @param methodName
       * @param methodDesc
       * @param args
       */
      async imputedContractCallGas(sender, value, contractAddress, methodName, methodDesc, args) {
        return await this.$post('/', 'imputedContractCallGas', [sender, value, contractAddress, methodName, methodDesc, args])
          .then(async (response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              let contractConstructorArgsTypes = await this.getContractMethodArgsTypes(contractAddress, methodName, methodDesc);
              if (!contractConstructorArgsTypes.success) {
                this.$message({
                  message: this.$t('call.call4') + response,
                  type: 'error',
                  duration: 3000
                });
                return;
              }
              let newArgs = utils.twoDimensionalArray(args, contractConstructorArgsTypes.data);
              //console.log(newArgs);
              this.contractCallData = {
                chainId: chainInfo.chainId,
                sender: sender,
                contractAddress: contractAddress,
                value: value,
                gasLimit: response.result.gasLimit,
                price: 25,
                methodName: methodName,
                methodDesc: methodDesc,
                args: newArgs
              };
              //console.log(this.contractCallData)
            } else {
              this.$message({message: this.$t('call.call4') + response, type: 'error', duration: 3000});
            }
          })
          .catch((error) => {
            this.$message({
              message: this.$t('call.call5') + JSON.stringify(error),
              type: 'error',
              duration: 3000
            });
          });
      },

      /**
       * 获取合约指定函数的参数类型
       * @param contractAddress
       * @param  methodName
       * @param  methodDesc
       */
      async getContractMethodArgsTypes(contractAddress, methodName, methodDesc) {
        return await this.$post('/', 'getContractMethodArgsTypes', [contractAddress, methodName, methodDesc])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              return {success: true, data: response.result};
            } else {
              return {success: false, data: response.error};
            }
          })
          .catch((error) => {
            return {success: false, data: error};
          });
      },

      /**
       * 获取账户余额
       * @param assetChainId
       * @param assetId
       * @param address
       **/
      getBalanceByAddress(assetChainId, assetId, address) {
        getBalanceOrNonceByAddress(address, assetChainId, assetId).then((response) => {
          //console.log(response);
          if (response.success) {
            this.balanceInfo = response;
          } else {
            this.$message({message: this.$t('public.err2') + response, type: 'error', duration: 3000});
          }
        }).catch((error) => {
          this.$message({message: this.$t('public.err3') + error, type: 'error', duration: 3000});
        });
      },

      /**
       *  获取密码框的密码
       * @param password
       **/
      async passSubmit(password) {
        //console.log(password);
        let newAddressInfo = this.addressList.filter(obj => obj.address === this.contractCallData.sender);
        let passwordInfo = await passwordVerification(newAddressInfo[0], password);
        //console.log(passwordInfo);
        if (!passwordInfo.success) {
          this.$message({message: this.$t('tips.tips4'), type: 'error', duration: 3000});
          for (let item of this.addressList) {
            if (item.address === newAddressInfo[0].address) {
              item.password = '';
            }
          }
          //console.log(this.addressList);
          localStorage.setItem('addressData', JSON.stringify(this.addressList));
          return;
        }

        //console.log(this.contractCallData);
        let amount = Number(Times(this.contractCallData.gasLimit, this.contractCallData.price));
        let transferInfo = {
          fromAddress: this.contractCallData.sender,
          assetsChainId: chainInfo.chainId,
          assetsId: 1,
          amount: amount,
          fee: 100000
        };

        amount = Number(Plus(transferInfo.fee, amount));
        let remark = '';
        //console.log(this.balanceInfo);
        let inOrOutputs = await inputsOrOutputs(transferInfo, this.balanceInfo, 16);
        //console.log(inOrOutputs);
        let tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 16, this.contractCallData);
        let txhex = '';
        //获取手续费
        let newFee = countFee(tAssemble, 1);
        //手续费大于0.001的时候重新组装交易及签名
        if (transferInfo.fee !== newFee) {
          transferInfo.fee = newFee;
          inOrOutputs = await inputsOrOutputs(transferInfo, this.balanceInfo, 16);
          tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 16, this.contractCallData);
          txhex = await nuls.transactionSerialize(passwordInfo.pri, passwordInfo.pub, tAssemble);
        } else {
          txhex = await nuls.transactionSerialize(passwordInfo.pri, passwordInfo.pub, tAssemble);
        }
        //console.log(txhex);
        this.typeRadio = 1;
        if (this.guiDialog) {
          this.guiDialog = false;
        }
        //验证交易
        /*let validateTxRes = await validateTx(txhex);
        console.log(validateTxRes);*/

        //验证并广播交易
        await validateAndBroadcast(txhex).then((response) => {
          //console.log(response);
          if (response.success) {
            this.$message({message: this.$t('tips.tips15'), type: 'success', duration: 1000});
          } else {
            if (response.data.code === 'err_0014') {
              this.$message({message: response.data.message, type: 'error', duration: 3000});
            } else {
              this.$message({
                message: this.$t('tips.tips14') + JSON.stringify(response.data),
                type: 'error',
                duration: 3000
              });
            }
          }
        }).catch((err) => {
          this.$message({message: this.$t('public.err1') + err, type: 'error', duration: 3000});
        });
      },

      /**
       * 连接跳转
       * @param name
       * @param param
       */
      toUrl(name, param) {
        //console.log(name)
        this.$router.push({
          name: name,
          query: {'address': param}
        })
      },
    }
  }
</script>

<style lang="less">
  .goblin {
    margin-bottom: 50px;

    .lis {
      width: 85rem;
      margin: 0 auto;

      ul {
        li {
          width: 5rem;
          text-align: center;
          height: 1.6rem;
          line-height: 1.6rem;
        }

        .w100 {
          width: 18rem;
        }

        .w200 {
          width: 20rem;

          .el-button {
            padding: 0 0.2rem;
          }
        }
      }

      .titles {
        li {
          background-color: #c1c1c1;
        }
      }
    }

    .guiji-dialog {
      .el-dialog {
        .el-dialog__body {
          .el-form {
            .el-form-item {
              .el-form-item__label {
                display: block;
                float: none;
                text-align: left;
              }

              .el-form-item__content {
                .el-select {
                  width: 100%;

                  .el-input {
                    width: 100%;
                  }

                  .el-input__inner {
                    width: 100%;
                  }
                }
              }
            }
          }
        }

        .dialog-footer {
          .el-button--success {
            width: 15rem;
          }
        }
      }
    }
  }

</style>
