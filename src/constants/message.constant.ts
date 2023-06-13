export const AppMessageNotFound = (url: string) => {
  return [`Not Found - ${url}`, `ရှာမတွေ့ပါ - ${url}`, ``];
};

export const AppMessageModelNotFound = (model: string) => {
  return [`${model} not found`, `${model} မတွေ့ရှိပါ`, ``];
};

export const fileNotFound = (() => {
  return [`File not found`, 'ဖိုင်မတွေ့ပါ', '']
})();

const AppMessage = {
  unauthorized: ["Unauthorized", "ဤလုပ်ဆောင်ချက်အား လုပ်ဆောင်ခွင့်မရှိပါ။", "无法访问 请稍后重试"],
  somethingWentWrong: ["Something went wrong", "အချက်အလက် တချို့ မှားယွင်းနေသည်။", "出现错误 请稍后重试"],
  alreadyExists: ["Already exists", "ဤလုပ်ဆောင်ချက်သည် ရှိနေပြီးသားဖြစ်သည်။", "已存在"],
  badRequest: ["Bad Request", "ပို့ဆောင်ချက် မှားယွင်းနေပါသည်။", "出现错误 请稍后重试"],
  forbiddenAction: ["Forbidden action", "ဤအရာသည် တားမြစ်ထားပါသည်။", "无法访问 请稍后重试"],
  retrievedSuccessful: ["Retrieved successful", "လုပ်ဆောင်ချက် အောင်မြင်သည်။", "检察成功"],
  invalidValue: ["Invalid values", "မမှန်ကန်သော အချက်အလက်များဖြစ်နေပါသည်။", "无效数据"],
  updated: ["Updated", "အချက်အလက်များ ပြင်ဆင်ပြီးပါပြီ", "已更新"],
  created: ["Created", "အောင်မြင်စွာ ဖန်တီးနိုင်ခဲ့သည်", "已创建"],
  createAgentLevelFirst: ["Create Agent Level first", "အေးဂျင့်အဆင့်ကို အရင်ဖန်တီးပါ။", "创建代理等级"],
  fileNotFound: [`File not found`, 'ဖိုင်မတွေ့ပါ', ''],
  codeDoesNotMatch: [`Code doesn't match`, '', ''],
  cannotLogin: [`Login unavailable, try again in 30 minutes`, ``, ``],
  listSuccessful: [`List`, ``, ``],

  //admin
  adminCreated: ["Admin Account Created", "အကောင့် အောင်မြင်စွာ ဖွင့်ပြီးပါပြီ", "管理员账号已存在"],
  adminUpdate: ["Admin information has been updated", "အချက်အလက်များကို ပြင်ဆင်ပြီးပါပြီ", "管理员信息已更新"],
  adminDelete: ["Admin deleted", "အကောင့်ဖျက်သိမ်းခြင်းလုပ်ဆောင်ချက် ပြီးပါပြီ", "管理员已删除"],

  //Merchant
  merchantCreated: ["Merchant Account Created", "အကောင့် အောင်မြင်စွာ ဖွင့်ပြီးပါပြီ", "管理员账号已存在"],
  merchantUpdate: ["Merchant information has been updated", "အချက်အလက်များကို ပြင်ဆင်ပြီးပါပြီ", "管理员信息已更新"],
  merchantDelete: ["Merchant deleted", "အကောင့်ဖျက်သိမ်းခြင်းလုပ်ဆောင်ချက် ပြီးပါပြီ", "管理员已删除"],

  //admin wallet
  // walletCreated: ["Admin Wallet created", "ငွေအကောင့် အောင်မြင်စွာ ဖွင့်ပြီးပါပြီ", "管理员钱包已创建"],
  // walletNotFound: ["Admin Wallet Account not found", " သင်၏ငွေအကောင့်ကို မတွေ့ရှိပါ။", "管理员钱包不存在"],
  // walletUpdate: ["Admin Wallet information has been updated", "ငွေအကောင့်အချက်အလက်များ ပြင်ဆင်ချက်အောင်မြင်ပါသည်။", "管理员钱包信息已更新"],
  // walletDelete: ["Admin Wallet Account deleted", "ငွေအကောင့်ဖျက်သိမ်းခြင်း ပြီးပါပြီ", "管理员钱包账号已删除"],

  // //payment
  // paymentCreated: ["Payment Account created", "ငွေပေးချေမှု့ အကောင့်ကို ဖွင့်လှစ်ပြီးပါပြီ", "支付账号已创建"],
  // paymentNotCreated: ["Payment can not created", "ငွေပေးချေမှု့ အကောင့်ဖွင့်၍မရပါ", "支付账号无法创建"],
  // paymentUpdate: ["Payment Account information has been updated", "ငွေပေးချေမှု့ အကောင့်၏ အချက်အလက်များ ပြင်ဆင်မှု့အောင်မြင်ပါသည်။", "支付账号信息已更新"],
  // paymentDelete: ["Payment Account deleted", "ငွေပေးချေမှု့ အကောင့်ကို ဖျက်သိမ်းပြီးပါပြီ", "支付账号已删除"],
  // paymentAlreadyExists: ["Payment Account already exists", "တူညီသောငွေပေးချေမှု့ အကောင့်ရှိနေ၍ထပ်မံပြု့လုပ်ခွင့်မရှိပါ။", "支付账号已存在"],

  // //Customer
  // customerCreated: ["Customer Account created", "သင်၏အကောင့် အောင်မြင်စွာ ဖွင့်လှစ်ပြီးပါပြီ", "用户账号已创建"],
  // customerNotFound: ["Customer Account not Found", "အကောင့်အား မတွေ့ရှိပါ", "用户账号不存在"],
  // customerUpdate: ["Customer Account information has been updated", "သင်၏အချက်အလက်များ အောင်မြင်စွာပြင်ဆင်ပြီးပါပြီ", "用户账号信息已更新"],
  // customerDelete: ["Customer Account deleted", "အကောင့်အား ဖျက်သိမ်းခဲ့ပါသည်။", "用户账号已删除"],
  // AdminDeleteCustomer: ["Admin deleted to Customer Account ", "အက်မင်မှ သင့်၏အကောင့်အား ဖျက်သိမ်းခဲ့ပါသည်။", ""],
  // customerAlreadyExists: ["Customer Account already exists", "ဤအကောင့်သည် ရှိနေပြီးသားဖြစ်ပါသည်။", "用户账号已存在"],

  // //OTP
  // sendOTP: ["Send OTP your email", "သင်၏ အီးလ်မေးကို OTP ပို့ထားပါသည်", ""],
  // verifyOTP: ["Verify is successful ", "စစ်ဆေးချက် အောင်မြင်ပါသည်", ""],
  // notFoundOTP: ["OTP not Found", "OTP code မတွေ့ရှိပါ", ""],
  // forgetPassword: ["Forget password is successful", "", ""],


  //Login
  invalidCredentials: ["Invalid username or password", " အမည် (သို့) လျှို့ဝှက်ကုဒ် မှားနေပါသည်", "无效用户名称或密码"],
  validCredentials: ["Successfully login", "အောင်မြင်သည်" ,"登录成功"],
  
  // // customer order
  // customerOrderApproved: ['Customer order has been approved', 'သင်၏ Order ကို လက်ခံပြီးပါပြီ', ''],

  // // agent order
  // receiverAgentOrderApproved: ['Receiver agent order has been approved', 'Receiver အေးဂျင့်၏ order ကို လက်ခံပြီးပါပြီ', ''],
  // transferredToTransferAgent: ['Transferred to transfer agent', '', ''],
  // transferredToCustomer: ['Transferred to customer', '', ''],
  // receiverAgentOrderCancel: ['Receiver agent order has been cancelled', ''],
  // transferAgentOrderCancel: ['Transfer agent order has been cancelled', ''],


  // //Agent Deposit
  // agentdepositOrderRequest: ["Created to request Agent Deposit Order", "", ""],
  // agentdepositOrderPending: ["Pending Agent Deposit Order", "", ""],


  // //Agent WithDrawal
  // agentWithdrawalOrderRequest: ["Created to request Agent WithDrawal Order", "", ""],
  // agentWithdrawalOrderPending: ["Pending Agent WithDrawal Order", "", ""],

  // //Admin Approve
  // agentDepositApproved: ['Agent Deposit has been approved', 'အေးဂျင့်၏ စရန်ငွေကို လက်ခံပြီးပါပြီ', ''],
  // agentWithDrawalApproved: ['Agent WithDrawal has been approved', '', ''],

  // //currency
  // currencyDelete: ['Currency Account deleted', '', ''],

  // //currency pair
  // currencyPairDelete: ['Currency Pair deleted', '', ''],

    //Status
    statusOn: ['Status on', '', ''],
    statusOff: ['Status off', '', ''],

};

export default AppMessage;
