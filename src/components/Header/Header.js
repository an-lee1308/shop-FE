import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/img/logo.png";
import banner from "../../assets/img/banner1.png";
import dangki from "../../assets/img/ak1.png";
import dangnhap from "../../assets/img/ak3.png";
import giohang from "../../assets/img/ak5.png";
import icon1 from "../../assets/img/xk1s.png";
import icon2 from "../../assets/img/xk2s.png";
import icon3 from "../../assets/img/xk3s.png";
import icon4 from "../../assets/img/xk4s.png";
import icon5 from "../../assets/img/xk5s.png";
import transferPrice from "../../helper/TransferPrice";
import laptop from "../../assets/img/xxx21.png";
import pc from "../../assets/img/xxx22.png";
import manhinh from "../../assets/img/xxx26.png";
import chuot from "../../assets/img/xxx28.png";
import banphim from "../../assets/img/xxx27.png";
import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CartItemHeader from "./CartItemHeader";
import * as action from "../../actions/user";
const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.cart) || [];
  const user = useSelector((state) => state.user);
  const [HideHeader, setHideHeader] = useState(false);
  const [userDropdown, setuserDropdown] = useState(false);
  function DropdownUser() {
    setuserDropdown(!userDropdown);
  }
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (e.target.defaultView.scrollY > 200) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
    });
  }, []);
  const [searchValue, setsearchValue] = useState(null);
  function onChangeValue(e) {
    setsearchValue(e.target.value);
  }
  function onSearch(e) {
    e.preventDefault();
    if (searchValue) {
      history.push(`/Products/search?q=${searchValue}`);
      setsearchValue("");
    }
  }
  function renderTotalMoney() {
    var total = 0;
    if (product.length > 0) {
      product.forEach((item) => {
        total += item.soluong * item.newprice;
      });
    }
    return total;
  }

  function renderCartItem() {
    var result = null;
    if (product && product.length > 0) {
      result = product.map((pro, index) => {
        return <CartItemHeader key={index} product={pro}></CartItemHeader>;
      });
    } else result = <div className="header-cart--empty">Kh??ng c?? s???n ph???m</div>;
    return result;
  }
  function onLogout() {
    setuserDropdown(false);
    localStorage.removeItem("Authorization");
    dispatch(action.logOutUser());
  }
  return (
    <header>
      <div class="banner_header">
        <img src={banner} alt="" class="banner-img" />
      </div>
      <nav
        style={
          HideHeader
            ? {
                position: "fixed",
                width: "100%",
                boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.06)",
              }
            : {}
        }
      >
        <div class="container">
          <div class="nav-wrap">
            <Link to="/">
              <img src={logo} alt="" class="nav-logo" />
            </Link>
            <form class="nav-search" onSubmit={onSearch}>
              <input
                type="text"
                class="nav-input"
                name="q"
                value={searchValue}
                placeholder="Nh???p t??? kh??a c???n t??m"
                onChange={onChangeValue}
              />
              <button type="submit" class="btn-search">
                <i class="fas fa-search"></i>
              </button>
            </form>
            <ul class="nav-menu">
              {user && (
                <div className="header__user">
                  <img src={user.image} className="header__user__img" />
                  <p className="header__user__name">{user.name}</p>
                  <ul className="header__user__dropdown">
                    <i className="fas fa-caret-down" onClick={DropdownUser}></i>
                    <div
                      className="header__user__dropdown--wrap"
                      style={
                        userDropdown ? { display: "flex" } : { display: "none" }
                      }
                    >
                      <Link
                        to="/user/order"
                        className="header__user__dropdown--link"
                        onClick={() => setuserDropdown(false)}
                      >
                        Qu???n l?? ????n h??ng
                      </Link>
                      <Link
                        to="/user/profile"
                        className="header__user__dropdown--link"
                        onClick={() => setuserDropdown(false)}
                      >
                        H??? S??
                      </Link>
                      {user.role == "ADMIN" && (
                        <Link
                          to="/admin/notification"
                          className="header__user__dropdown--link"
                          onClick={() => setuserDropdown(false)}
                        >
                          Admin
                        </Link>
                      )}
                      <span
                        to="/"
                        className="header__user__dropdown--link"
                        onClick={onLogout}
                      >
                        Tho??t
                      </span>
                    </div>
                  </ul>
                </div>
              )}
              {!user && (
                <li
                  class="nav-item"
                  id="dangky"
                  onClick={() => dispatch(actions.showRegister())}
                >
                  <img src={dangki} alt="" class="nav-item-img" />
                  <span>????NG K??</span>
                </li>
              )}
              {!user && (
                <li
                  class="nav-item"
                  id="dangnhap"
                  onClick={() => dispatch(actions.showLogin())}
                >
                  <img src={dangnhap} alt="" class="nav-item-img" />
                  <span>????NG NH???P</span>
                </li>
              )}
              <li class="nav-item nav-item__cart">
                <div class="nav-item__cart--noti">{product.length}</div>
                <Link to="/Cart" class="nav-item__cart-link">
                  <img src={giohang} alt="" class="nav-item-img" />
                  <span>GI??? H??NG</span>
                </Link>
                <div class=" nav-item__cart-list">
                  <ul class="contain-cart">{renderCartItem()}</ul>
                  <div class="contain-cart-total">
                    <div class="container-cart-total-pay">
                      <span class="container-cart-total-pay__text">
                        T???ng Ti???n:
                      </span>
                      <span class="container-cart-total-pay__price">
                        {transferPrice(renderTotalMoney())}
                      </span>
                    </div>
                  </div>
                  <Link to="/Cart" class="container-cart-btn-link">
                    Xem T???t C???
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div class="header-main-wrap">
            <div class="header-category">
              <i class="fas fa-bars"></i>
              <span>Danh m???c s???n ph???m</span>
              <div class="header-categore-dropdown container ">
                <div class="header-categore-dropdown-wrap">
                  <ul class="header-category-list">
                    <Link to="/Products/Laptop">
                      <li class="header-category-item">
                        <img
                          src={laptop}
                          alt=""
                          class="header-category-item-img"
                        />
                        <span>Laptop</span>
                      </li>
                    </Link>
                    <Link to="/Products/M??n H??nh">
                      <li class="header-category-item">
                        <img
                          src={manhinh}
                          alt=""
                          class="header-category-item-img"
                        />
                        <span>M??n H??nh</span>
                      </li>
                    </Link>
                    <Link to="/Products/Chu???t">
                      <li class="header-category-item">
                        <img
                          src={chuot}
                          alt=""
                          class="header-category-item-img"
                        />
                        <span>Chu???t</span>
                      </li>
                    </Link>
                    <Link to="/Products/B??n Ph??m">
                      <li class="header-category-item">
                        <img
                          src={banphim}
                          alt=""
                          class="header-category-item-img"
                        />
                        <span>B??n ph??m</span>
                      </li>
                    </Link>
                    <Link to="/Products/PC">
                      <li class="header-category-item">
                        <img src={pc} alt="" class="header-category-item-img" />
                        <span>PC</span>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
            <ul class="header-navigation">
              <li class="header-navigation-item">
                <img src={icon1} alt="" class="header-navigation-item-img" />
                <span>BACK TO SCHOOL 2020</span>
              </li>
              <li class="header-navigation-item">
                <img src={icon2} alt="" class="header-navigation-item-img" />
                <span> H?????NG D???N THANH TO??N</span>
              </li>
              <li class="header-navigation-item">
                <img src={icon3} alt="" class="header-navigation-item-img" />
                <span>H?????NG D???N TR??? G??P</span>
              </li>
              <li class="header-navigation-item">
                <img src={icon4} alt="" class="header-navigation-item-img" />
                <span>CH??NH S??CH B???O H??NH</span>
              </li>
              <li class="header-navigation-item">
                <img src={icon5} alt="" class="header-navigation-item-img" />
                <span>CH??NH S??CH V???N CHUY???N</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
