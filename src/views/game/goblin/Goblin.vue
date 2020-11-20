<template>
  <div class="goblin w1200">
    <div class="tc title">Goblin 助手</div>
    <el-table :data="addressList" style="width: 100%">
      <el-table-column label="地址" prop="addresss" align="center">
      </el-table-column>
      <el-table-column label="别名" prop="alias" align="center">
      </el-table-column>
      <el-table-column label="余额(nuls)" prop="balance" align="center">
      </el-table-column>
      <el-table-column label="余额(goblin)" prop="goblinBalance" align="center">
      </el-table-column>
      <el-table-column label="余额(black_iron)" prop="blackBalance" align="center">
      </el-table-column>
      <el-table-column label="余额(tungsten)" prop="tungstenBalance" align="center">
      </el-table-column>
      <el-table-column label="我的军团" prop="myLegions" align="center">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="lis">
            <ul class="titles">
              <li class="fl">名称</li>
              <li class="fl">ID</li>
              <li class="fl">挖矿收益率</li>
              <li class="fl">等级</li>
              <li class="fl">状态</li>
              <li class="fl">矿场</li>
              <li class="fl w100">待收获</li>
              <li class="fl w200">操作</li>
            </ul>

            <ul v-for="(item,index) of props.row.legionsData" :key="index" class="cb">
              <li class="fl">{{item.name}}</li>
              <li class="fl">{{item.id}}</li>
              <li class="fl">{{item.miningSpeed}}</li>
              <li class="fl">{{item.level}}</li>
              <li class="fl">{{item.status === '1' ? '挖矿':'空闲'}}</li>
              <li class="fl">{{item.caveType}}</li>
              <li class="fl w100">{{item.goblinBlack}}</li>
              <li class="fl w200">
                <el-button type="text" :disabled="item.status === '1'" @click="upgrade(item)">升级</el-button>
                <el-button type="text" :disabled="item.status === '1'" @click="sent(item)">派出</el-button>
                <!--<el-button type="text">迁回</el-button>-->
                <el-button type="text" :disabled="item.status !== '1'" @click="acquire(item)">获取</el-button>
                <el-button type="text" :disabled="item.status !== '1'" @click="backs(item)">迁回</el-button>
              </li>
            </ul>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="guiji(scope.row)" type="text" size="small">归集</el-button>
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
            <el-option v-for="item in assetsList" :key="item.key" :label="item.tokenName +'('+item.balances +')'"
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
            <el-option v-for="(item,index) in addressList" :key="index" :label="item.address" :value="item.address">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="startCollection('guijiForm')">开始归集</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择挖矿类型" :visible.sync="typeDialog">
      <div class="tc">
        <el-radio-group v-model="typeRadio">
          <el-radio :label="1">黑铁矿</el-radio>
          <el-radio :label="2">钨矿</el-radio>
          <el-radio :label="3">铂金矿</el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer" style="margin: 20px 0 0 0">
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
  import Password from '@/components/PasswordBar'
  import {
    timesDecimals,
    divisionDecimals,
    accountList,
    superLong,
    getArgs,
    Times,
    chainID,
    passwordVerification, Plus
  } from '@/api/util'
  import {
    getNulsBalance,
    countFee,
    inputsOrOutputs,
    validateAndBroadcast
  } from '@/api/requestData'

  export default {
    data() {
      return {
        addressList: [],//地址列表
        contractAddress: 'NULSd6HgvBGqSQBr49QmB9BJia4RnzsAWpjtE',//合约地址
        contractInfo: {},//合约详情
        contractAddressBlackIron: 'NULSd6HguK98JD4yFfjYkDTq8VXfPYDNeFMiL',//合约地址(黑铁矿)
        contractInfoBlackIron: {},//合约详情(黑铁矿)
        contractAddressTungsten: 'NULSd6HgngWZE3u8WRe4QxCVcUiyGtDP7cGEU',//合约地址(钨矿)
        contractInfoTungsten: {},//合约详情(钨矿)

        contractAddressCollection: 'NULSd6HgnScefpS1jGFvJZeNPnFRtAebwVpJr',//合约地址(归集)
        contractInfoCollection: {},//合约详情(归集)

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
      };
    },
    components: {
      Password,
    },
    created() {
      this.addressList = accountList(0);
      this.init();
    },
    mounted() {
      this.getAddressList();
      this.goblinSetInterval = setInterval(() => {
        this.getAddressList();
      }, 10000);
    },
    beforeDestroy() {
      //离开界面清除定时器
      clearInterval(this.goblinSetInterval);
    },
    methods: {

      async init() {
        let resData = await this.contractInfoByAddress(this.contractAddress);
        if (resData.success) {
          this.contractInfo = resData.data;
        }

        let resDataBlackIron = await this.contractInfoByAddress(this.contractAddressBlackIron);
        if (resDataBlackIron.success) {
          this.contractInfoBlackIron = resDataBlackIron.data;
        }

        let resDataTungsten = await this.contractInfoByAddress(this.contractAddressTungsten);
        if (resDataTungsten.success) {
          this.contractInfoTungsten = resDataTungsten.data;
        }
      },

      /**
       * 获取账户列表
       */
      async getAddressList() {
        for (let item of this.addressList) {
          item.addresss = superLong(item.address, 4);
          /*item.balance = 0;
          item.goblinBalance = 0;
          item.myLegions = 0;
          item.legionsData = [];*/
          let addressInfo = await this.getAddressInfoByNode(item.address);
          if (addressInfo.success) {
            item.balance = timesDecimals(addressInfo.data.balance);
            let tokenList = await this.getTokenListByAddress(item.address);
            item.tokens = tokenList.data.list;
            for (let k of addressInfo.data.tokens) {
              let newArr = k.split(',');
              //console.log(newArr);
              if (newArr[1] === 'Goblin') {
                let goblinInfo = tokenList.data.list.filter(obj => obj.tokenName === newArr[1]);
                item.goblinBalance = timesDecimals(goblinInfo[0].balance, goblinInfo[0].decimals);
              } else if (newArr[1] === 'black_iron') {
                let blackInfo = tokenList.data.list.filter(obj => obj.tokenName === newArr[1]);
                item.blackBalance = timesDecimals(blackInfo[0].balance, blackInfo[0].decimals);
              } else if (newArr[1] === 'tungsten') {
                let blackInfo = tokenList.data.list.filter(obj => obj.tokenName === newArr[1]);
                item.tungstenBalance = timesDecimals(blackInfo[0].balance, blackInfo[0].decimals);
              }
            }
          }

          let name = 'getRoles';
          let methodsInfo = this.contractInfo.methods.filter(obj => obj.name === 'getRoles');
          let desc = methodsInfo[0].desc;
          methodsInfo[0].params[0].value = item.address;
          let newArgs = getArgs(methodsInfo[0].params);
          let myLegionsRes = await  this.methodCall(this.contractAddress, name, desc, newArgs.args);
          //console.log(myLegionsRes);
          if (myLegionsRes.success) {
            item.myLegions = JSON.parse(myLegionsRes.data.result).length;
            item.legionsData = JSON.parse(myLegionsRes.data.result);
            for (let q of item.legionsData) {
              q.address = item.address;
              let nameTwo = 'earnedOf';
              let methodsInfoTwo = this.contractInfoBlackIron.methods.filter(obj => obj.name === nameTwo);
              let descTwo = methodsInfoTwo[0].desc;
              methodsInfoTwo[0].params[0].value = q.caveType;
              methodsInfoTwo[0].params[1].value = item.address;
              let newArgsTwo = getArgs(methodsInfoTwo[0].params);
              let resData = await  this.methodCall(this.contractAddressBlackIron, nameTwo, descTwo, newArgsTwo.args);
              //console.log(resData);
              if (resData.success) {
                let goblin = timesDecimals(JSON.parse(resData.data.result)[0]).toFixed(2).toString();
                let black = timesDecimals(JSON.parse(resData.data.result)[1]).toFixed(2).toString();
                q.goblinBlack = goblin + '(GOBLIN)' + ' - ' + black + '(' + q.caveType + ')';
              }
            }
            //console.log(this.contractInfoBlackIron);

          }

          //console.log(this.addressList);
        }
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
      changeAssets(e) {
        //console.log(e);
        let newAssetsInfo = this.assetsList.filter(obj => obj.tokenName === e);
        this.guijiForm.amount = newAssetsInfo[0].balances;
      },

      /**
       * @disc: guiji
       * @params:
       * @date: 2020-11-18 15:09
       * @author: Wave
       */
      async guiji(rowInfo) {
        //console.log(rowInfo);
        this.guijiForm.fromAddress = rowInfo.address;
        this.assetsList = [];
        for (let item of rowInfo.tokens) {
          //console.log(item.tokenName);
          item.balances = timesDecimals(item.balance, item.decimals).toString();
          if (item.tokenName === 'black_iron') {
            this.assetsList.push(item)
          } else if (item.tokenName === 'tungsten') {
            this.assetsList.push(item)
          }
        }
        //console.log(this.assetsList);
        if (this.assetsList.length !== 0) {
          this.guijiForm.assets = this.assetsList[0];
          this.guijiForm.amount = this.guijiForm.assets.balances;
          this.guijiForm.toAddress = this.addressList[0].address;
        }

        let resDataTungsten = await this.contractInfoByAddress(this.contractAddressCollection);
        if (resDataTungsten.success) {
          this.contractInfoCollection = resDataTungsten.data;
        }

        this.guiDialog = true;
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
            //console.log(this.contractInfoCollection);
            let name = 'transfer';
            let methodsInfo = this.contractInfoCollection.methods.filter(obj => obj.name === name);
            //console.log(methodsInfo[0]);
            methodsInfo[0].params[0].value = this.guijiForm.toAddress;
            methodsInfo[0].params[1].value = Number(divisionDecimals(this.guijiForm.amount, this.contractInfoCollection.decimals));
            let newArgs = getArgs(methodsInfo[0].params);
            //console.log(this.guijiForm.fromAddress, methodsInfo[0], this.contractAddressCollection, 0, newArgs);
            this.chainMethodCall(this.guijiForm.fromAddress, methodsInfo[0], this.contractAddressCollection, 0, newArgs);
            this.getBalanceByAddress(chainID(), 1, this.guijiForm.fromAddress);
            this.$refs.password.showPassword(true);
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
        let name = 'levelUp';
        let methodsInfo = this.contractInfo.methods.filter(obj => obj.name === name);
        //console.log(methodsInfo[0].params);
        methodsInfo[0].params[0].value = info.id;
        let newArgs = getArgs(methodsInfo[0].params);
        this.chainMethodCall(info.address, methodsInfo[0], this.contractAddress, 0, newArgs);
        this.getBalanceByAddress(chainID(), 1, info.address);
        this.$refs.password.showPassword(true);
        //let resData = await this.chainMethodCall(info.address, methodsInfo[0], this.contractAddressBlackIron, values);
        //console.log(resData);
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
        let name = 'enterMineCave';
        let methodsInfo = this.contractInfo.methods.filter(obj => obj.name === name);
        //console.log(methodsInfo[0]);
        methodsInfo[0].params[0].value = this.contractAddressBlackIron;
        methodsInfo[0].params[1].value = this.sentInfo.id;
        methodsInfo[0].params[2].value = 'mineral';
        if (this.typeRadio === 1) {
          methodsInfo[0].params[3].value = 'BlackIron';
        } else if (this.typeRadio === 2) {
          methodsInfo[0].params[3].value = 'Tungsten';
        }
        let newArgs = getArgs(methodsInfo[0].params);
        this.chainMethodCall(this.sentInfo.address, methodsInfo[0], this.contractAddress, 0, newArgs);
        this.getBalanceByAddress(chainID(), 1, this.sentInfo.address);
        this.$refs.password.showPassword(true);
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
        let methodsInfo = this.contractInfoBlackIron.methods.filter(obj => obj.name === name);
        //console.log(methodsInfo[0].params);
        methodsInfo[0].params[0].value = info.caveType;
        let newArgs = getArgs(methodsInfo[0].params);
        this.chainMethodCall(info.address, methodsInfo[0], this.contractAddressBlackIron, 0, newArgs);
        this.getBalanceByAddress(chainID(), 1, info.address);
        this.$refs.password.showPassword(true);
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
        console.log(info);
        let name = 'remandFromMineCave';
        let methodsInfo = this.contractInfo.methods.filter(obj => obj.name === name);
        console.log(methodsInfo[0]);
        methodsInfo[0].params[0].value = this.contractAddressBlackIron;
        methodsInfo[0].params[1].value = info.id;
        methodsInfo[0].params[2].value = info.caveType;
        let newArgs = getArgs(methodsInfo[0].params);
        this.chainMethodCall(info.address, methodsInfo[0], this.contractAddress, 0, newArgs);
        this.getBalanceByAddress(chainID(), 1, info.address);
        this.$refs.password.showPassword(true);
      },

      /**
       * 上链方法调用
       */
      chainMethodCall(address, methodsInfo, contractAddress, values, newArgs) {
        //console.log(address, methodsInfo, contractAddress, values,newArgs);
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
        //console.log(sender, value, gasLimit, price, contractAddress, methodName, methodDesc, args);
        return await this.$post('/', 'validateContractCall', [sender, value, gasLimit, price, contractAddress, methodName, methodDesc, args])
          .then((response) => {
            //console.log(response);
            if (response.result.success) {
              //return {success: true, data: response.result};
              this.imputedContractCallGas(sender, value, contractAddress, methodName, methodDesc, args)
            } else {
              this.$message({message: this.$t('call.call6') + response.result.msg, type: 'error', duration: 2000});
            }
          })
          .catch((error) => {
            this.$message({message: this.$t('call.call7') + error, type: 'error', duration: 2000});
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
                this.$message({message: this.$t('call.call4') + response, type: 'error', duration: 3000});
                return;
              }
              let newArgs = utils.twoDimensionalArray(args, contractConstructorArgsTypes.data);
              //console.log(newArgs);
              this.contractCallData = {
                chainId: chainID(),
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
            this.$message({message: this.$t('call.call5') + JSON.stringify(error), type: 'error', duration: 3000});
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
        getNulsBalance(assetChainId, assetId, address).then((response) => {
          //console.log(response);
          if (response.success) {
            this.balanceInfo = response.data;
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
          this.$message({message: this.$t('address.address13'), type: 'error', duration: 3000});
          return;
        }

        //console.log(this.contractCallData);
        let amount = Number(Times(this.contractCallData.gasLimit, this.contractCallData.price));
        let transferInfo = {
          fromAddress: this.contractCallData.sender,
          assetsChainId: chainID(),
          assetsId: 1,
          amount: amount,
          fee: 100000
        };

        /*let transferInfo = {
          fromAddress: this.transferForm.fromAddress,
          toAddress: this.aliasToAddress ,
          assetType: this.transferForm.assetType,
          amount: Number(divisionDecimals(this.transferForm.amount, this.assetsInfo.decimals)),
          gas: this.transferForm.gas,
          price: this.transferForm.price,
          fee: Number(divisionDecimals(this.transferForm.fee, this.defaultInfo.defaultAsset.decimals)),
          assetsChainId: this.assetsInfo.chainId,
          assetsId: this.assetsInfo.assetId,
        };*/

        amount = Number(Plus(transferInfo.fee, amount));
        /*if (this.callForm.values > 0) {
          transferInfo.toAddress = this.contractAddress;
          transferInfo.value = Number(divisionDecimals(this.callForm.values));
          transferInfo.amount = Number(Plus(transferInfo.value, amount))
        }*/
        let remark = '';
        let inOrOutputs = await inputsOrOutputs(transferInfo, this.balanceInfo, 16);
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
        //验证并广播交易
        await validateAndBroadcast(txhex).then((response) => {
          //console.log(response);
          if (response.success) {
            this.$message({message: this.$t('tips.tips0'), type: 'success', duration: 1000});
          } else {
            if (response.data.code === 'err_0014') {
              this.$message({message: response.data.message, type: 'error', duration: 3000});
            } else {
              this.$message({message: this.$t('error.' + response.data.code), type: 'error', duration: 3000});
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
    .lis {
      width: 85rem;
      margin: 0 auto;
      ul {
        li {
          width: 6rem;
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
                  .el-input__inner {
                    width: 100%;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

</style>
