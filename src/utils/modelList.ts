import Admin from "../models/admin.model";
import Role from "../models/role.model";
import Color from "../models/color.model";
import Customer from "../models/customer.model";
import BrandType from "../models/brand_type.model";
import EntryAdmin from "../models/entry_admin.model";
import EntryMerchant from "../models/entry_merchant.model";
import LoginAttempt from "../models/login_attempt.model";
import Merchant from "../models/merchant.model";
import MerchantType from "../models/merchant_type.model";
import Order from "../models/order.model";
import OrderSlip from "../models/order_slip.model";
import PasswordReset from "../models/password_reset.model";
import Product from "../models/products.model";
import ProductOrder from "../models/products_order.model";
import Rating from "../models/rating.model";
import VerificationCode from "../models/verification_code.model";
import Blog from "../models/blog.model";
import Cart from "../models/cart.model";
import Cuopon from "../models/coupon.model";
import ProductCart from "../models/product_cart.model";
import Permission from "../models/permission.model";
import RolePermission from "../models/role_permission.model";


export const modelList = [
  Admin,
  Role,
  Color,
  Customer,
  BrandType,
  EntryAdmin,
  EntryMerchant,
  LoginAttempt,
  Merchant,
  MerchantType,
  Order,
  OrderSlip,
  PasswordReset,
  Product,
  ProductOrder,
  Rating,
  VerificationCode,
  Blog,
  Cart,
  Cuopon,
  ProductCart,
  Permission,
  RolePermission,
];
