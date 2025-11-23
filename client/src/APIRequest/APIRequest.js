import axios from "axios";
import FormHelper from "../helper/FormHelper";
import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import SessionHelper, {
  getToken,
  setEmail,
  setOTP,
  setToken,
  setUserData,
} from "../helper/SessionHelper";
import {
  SetCanceledTasks,
  SetCompletedTasks,
  SetNewTasks,
  SetProgressTasks,
} from "../redux/state-slice/task-slice";
import { SetSummary } from "../redux/state-slice/summary-slice";
import { setProfile } from "../redux/state-slice/profile-slice";

// Base URL
const BASE_URL = "/api/v1";

// Token header
const AxiosHeader = {
  headers: {
    token: getToken(),
  },
};

//--------- Update Task Status Request-----------//
export function UpdateRequest(id, status) {
  store.dispatch(ShowLoader());
  const URL = BASE_URL + `/updateTaskStatus/${id}/${status}`;
  const PostBody = { status: status };
  return axios
    .get(URL, AxiosHeader)
    .then((res) => {
      console.log(res);
      store.dispatch(HideLoader());
      if (res["status"] === 200) {
        return true;
      } else {
        FormHelper.errorToast("Failed to update task!");
        return false;
      }
    })
    .catch(() => {
      store.dispatch(HideLoader());
      FormHelper.errorToast("Something went wrong!");
      return false;
    });
}

//--------- Delete Task Request-----------//
export function DeleteRequest(id) {
  store.dispatch(ShowLoader());
  const URl = BASE_URL + `/deleteTask/${id}`;

  return axios
    .get(URl, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res["status"] === 200) {
        FormHelper.successToast("Task deleted successfully!");
        return true;
      } else {
        FormHelper.errorToast("Failed to delete task!");
        return false;
      }
    })
    .catch(() => {
      store.dispatch(HideLoader());
      FormHelper.errorToast("Something went wrong!");
      return false;
    });
}

//--------- Summary Request-----------//
export function SummaryRequest() {
  store.dispatch(ShowLoader());
  const URl = BASE_URL + "/countTasksByStatus";
  axios
    .get(URl, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res["status"] === 200) {
        store.dispatch(SetSummary(res.data["data"]));
      } else {
        FormHelper.errorToast("Failed to fetch summary!");
        return false;
      }
    })
    .catch(() => {
      store.dispatch(HideLoader());
      FormHelper.errorToast("Something went wrong!");
      return false;
    });
}
//--------- Task List By Status Request-----------//
export function TaskListByStatus(status) {
  store.dispatch(ShowLoader());
  const URl = BASE_URL + "/getTasksByStatus/" + status;
  return axios
    .get(URl, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res["status"] === 200) {
        if (status === "New") {
          store.dispatch(SetNewTasks(res.data["data"]));
        } else if (status === "In-Progress") {
          store.dispatch(SetProgressTasks(res.data["data"]));
        } else if (status === "Completed") {
          store.dispatch(SetCompletedTasks(res.data["data"]));
        } else if (status === "Canceled") {
          store.dispatch(SetCanceledTasks(res.data["data"]));
        }
      } else {
        FormHelper.errorToast("Failed to fetch tasks!");
        return false;
      }
    })
    .catch(() => {
      store.dispatch(HideLoader());
      FormHelper.errorToast("Something went wrong!");
      return false;
    });
}

//--------- Create New Task-----------//
export function NewTaskRequest(createData) {
  store.dispatch(ShowLoader());
  const URl = BASE_URL + "/createTask";
  const PostBody = createData;
  PostBody.status = "new";
  return axios
    .post(URl, PostBody, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res["status"] === 200) {
        FormHelper.successToast("Task created successfully!");
        return true;
      } else {
        FormHelper.errorToast("Failed to create task!");
        return false;
      }
    })
    .catch(() => {
      store.dispatch(HideLoader());
      FormHelper.errorToast("Something went wrong!");
      return false;
    });
}
//--------- Login user-----------//
export function LoginRequest(loginData) {
  store.dispatch(ShowLoader());
  const URl = BASE_URL + "/login";
  const PostBody = loginData;
  return axios
    .post(URl, PostBody)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res["status"] === 200) {
        setToken(res.data["token"]);
        setUserData(res.data["data"]);
        FormHelper.successToast("Login Success!");
      } else {
        FormHelper.errorToast("Invalid credentials!");

        return false;
      }
    })
    .catch(() => {
      store.dispatch(HideLoader());
      FormHelper.errorToast("Something went wrong!");

      return false;
    });
}

//--------- Registration user-----------//
export function RegistrationRequest(userData) {
  store.dispatch(ShowLoader());
  const URl = BASE_URL + "/registration";
  const PostBody = userData;
  PostBody.photo =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhASFRUXFRUVFxcVFRUVFhMWFRYXFxgVFRYYHSggGBolGxUVITEhJykrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGzclICUtLS0uLS0tLS8tLy0tLS0tLS0tKy0vLS0tKy0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQIDBAcFBgj/xABFEAACAQICBgUKAwQIBwAAAAAAAQIDEQQhEjFBUWFxBQaBkbEHExUiVJOh0eHwMlLBQnKSohQjNERTYsLxJHOCg7Kzw//EABsBAQACAwEBAAAAAAAAAAAAAAABAgMEBQYH/8QANxEBAAIBAgMECAYBBAMBAAAAAAECEQMEEiExBUFRkQYUUmFxgaHwEyIyscHRQjNyguE0Q/Ek/9oADAMBAAIRAxEAPwD547z6uAAJasMoiYnogJAAAAAAAAAAAAAAAAEtBETmMoCQAAAAAAAAAAAbeHoW9aWTWa4Wzu1t2ZFJtnlDW1NTP5YYMRJOWWr727eZavRm04mK82MlcAAAAGanT1Nq7eqO/i+BEyx2t3R85WqRs7Tha+1XvzWdiI90q15xmssNSFv0e9FonLJW2YVCwAAAAAG7Qo6PrPJ89WzZ257GikznlDWvqcXKPv7+rVqtXdtWzYWjoz0iYrGVCVgAAAAZ6dLheT1R/VlZlitfPfiPH+ias9GUdF71fLsvq5CPcRnGazlinFp2ZZkrMTGYVCQDYw8FfPua7+22wraWHUty5IrVdcU7q/G3Jd7z2iI7ylP8pYCzMAAAAABswq6MozSvlZ9itbg7WK4zmGCa8UTVuVpxmlOatFXstsm/9ikZjlDDWLVnhr1ebUnfZZbFuRliG3WuIUCwAAAANrCwV87duxb0/uxS0tfVtM9Pv7+rHUqu2je6W3f2bETEd7JSnPilhLMgAAAAAG5Tr6E9K10133tdrtWopjMYa/Bx04e+GxiXFrzk1stGN83tu7ERnpDFTiieGnzl5s53d/tGSIw3K1xGFQlMXmJRaMxhlrVU0sle1m1le2rIrEMdKTE5lhLMqUgIAAAAAC8J24p61v8AqJhW1clSo3bcsktwiMFa8KtgsgAAAAWg7ESraMxhfEVVJ5JLfbVfgtiERhXTpNerESyJSAgAAAAS0BaFS2TV1u471uImFbVzzjqVKjk7vkuC3ImIwVrFYxCgWAAAAAAtr5+P1COioSASkEIbCQAB7fV7qvicY704aML2dSeUOKX5nwXaYdXXrp9ernb7tPb7SMXnM+Edf+n33R3kzw0c61SpUe5Wpw7leXxNK+8vP6eTzev6R7i3LTrFY85/r6PXp9R+j1/dk+c6j8ZGOdzqT3tG3bW+n/2fSP6UrdQ+j5f3e3GNSovhpWEbnVjvWr25vq/5/SP6fPdL+TGNnLDVpJ/kqWafBTSy7UzPTez/AJQ6e29JbRONevzj+p6+cOdY7C1KU5U6sHCcXZxez5rjtN+totGYep0dWmrSL6c5ie9gJZQABbXz8QjoqEgFkghVsJAAAAAAAAAAC2vn4/UI6ISAhsJAAH1XUXqr/TKjnUuqEH61snOWvQT2bLvc+N1rbjX/AA4xHVxu2O1PVKcFP1z090eP9f8ATslCjGEVCEVGMUkklZJLYkcuZzzl4O1rXtNrTmZZCFQAAA+Q669T3jZ05wnCm4xlGTabcldOOrd63ebOhuPw4mJdvsrtaNnS1bRMxOJj3eP8PkukPJrioRcqc6dW37KvGT5J5PvNqu8pPWMO3o+ke3vOLxNff1j6c/o+LqQcW4yTTTaaas01rTT1M24nL0FbRaMx0VCQC2vn4hHQSAq2EgAAAAAAAAAAAlIIWbvz8QdFAkAtTg5NRSu20kltbySEziMotaKxMz0h3/q/0ZHDYenRjb1YrSa/ak85S7Xc4mpeb2mz5lvNzO517as988vh3R5PRKNYAAAAAABxryn4aMMc3FW06cJv97ON/wCVHV2kzOm956P6lr7OInumY/n+XyRsu2AWQR1Hnz8QdFQkAAAAAAAAAAJSCENhIBbXz8fqEdFQl7fUrDqpjsPF/wCIpfwJz/0mHcTjTlz+1tSabPUmPDHny/l3c475wAAAAAAAAcU8pGJ08fUWyChDuim/jJnW2sY03v8AsHT4NlWfHM/X/p8wbDsLJBCrYSAW18/EI6KhIAAAAAAABKBKGwAAABLYHs9S8SqeOw8nq84o/wAacP8AUYdxXOnMOf2rpzqbPUiPDPlz/h3g475wiLuBIAAAAARKSSu9SzYIjPJ+eOlMX56tUqu/rzlPPZpSbS7DuUrw1iH1Hb6X4OlXT8IiPKGqizMNgAAACWwIAlK+oEzjnKAROQABmpU9Tau3+GO/i+BEyx2t3R85XqxlC2nCNnuSXc1qZEYnopXht+mZYakLas09T+fEmJZa2z16qErAAAAAmDaaave+Vtd+AlExExzd96C6S/pGHp1dTlH1l/nT0ZJcNJM4mpTgtMPmW80PwNe2n4Ty+HWPo9KCKNZYAAAAAPF631akcHXdKLlLQay2KWUpdkW32GXRiJvGW92bWlt1pxecRn9ucR855OIVU4u04JcUlfmrZdh1459H0OuJjNJYKkLPwe9FonLLW2YVCQAAAASlfJAmcc5btKkoq7tq4tWeWzZbbvt20mcy1b3m84hp1JXbf38C8dGzWMRhUJANiNRrRms9HJ9719hXHcwzWJzWe9uzqqcVOatFale7kymMTiGCKzW3DXq82rUu9VlsS1IyxGG3WvDCgWAAAABsYZJZu3bZq223ErZg1JmejvfQVOEcPRULaKpU9G21aCs+Jxb54py+bbqbTr3m/XinPxy3yrAAAAAABjsrWfc9VgOE41wu5POKclTV/wASvlJvlY7NcvpGlF8RWOve8mpO7+7JbjLEYb1a4hUJAAAAkCZw2cPFbbbb3V9jtbttfaUmWvqTM/f38mKrUvld2W/W+L7LFohlpTHNjJXAAFoTt95NbmJhFqxKZzvbctS2IRCK1iFUgt0QAAAAJixKJjMMtetpfq9rIiuFNPT4X23UTrsqCWHxLfm7+pPX5u/7MlrceOtctWpuNtxfmr1ee7Y7FnWmdbQ/V3x4++Pf+/x69VTvqOa8akAAAAAOc9euu8Vp4bD5vOFSpmktjhDe9a0tmzet7b7bP5rPUdkdizbGvr8o6xH7TPu93n7+a1Jt6+S3JbkdCIw9bWsV6K2CwAAAALQdiJ5q2jML4irpO9vq94iMK6dOGGIlkAAAAAAAW18/EI6KhIBMV3BEyNhMIAAdh8mnTvn8P5mb/rKNo/vU/wBl9n4exbzl7rS4LZjpLwnbux/A1/xKx+W/P59/9/8Ax9iarhgAAB8/136c/omGlKLtUn6lPepNZy/6Vnzstpm0NPjvjudPsnZetbiKz+mOc/Dw+bhp2H0QAJgWaCFQkAskEKthIAAAAAAAAAAW18/EI6Iiu4EyNhMQgAAA9Lq/0vPCV4VobHaS/PB/ij97UjHq6cXriWpvdpXdaM6Vvl7p7pd46PxsK1ONWnK8JpNP9Hua1NcDjWrNZxL5vraV9G86d4xMNghjAKVqsYRcpNKMU228kkldtvcTEZ5QmtZtMVrGZlw3rj0+8ZiHNX83H1aa/wAv5mt719y2HX0NL8OuO99E7L2EbTQis/qnnPx8Pk8IzOkAACYFmggSAhsJQAAAAAAAAAAALRW0ImUt3CI/KoFgAAAAdn8mP9gh+/U/8jk7r/Ul4Lt//wA23wj9n1ZruKAeJ12/sOI/5b8UZdD/AFI+Lodlf+Zp/Fwg7L6OAAAACyyzCJ58h55g6clQkAAAAAAAAAAJS7giZJMJiEAW18/EI6KhIAA9no3qtjK7tDD1EvzTThG2/Sla/ZcxW19OvWWhuO09roRm14+Ec58odd6m9E1MLhY0aji5KUm9Ftr1nfW0jl694vfih4ftPd03W4nVpnHLq9wxOeAeb1iwMq+Gq0YOKlODinK6V+Nky+nbhtEy2tlr10NxTUt0ic8nHOk+qGNoP1sPOS/NTTqR/lzXakdWm407d73e37X2mvHK+J8J5T9evyeHKLTs1ZrJrcZnSiYmMwgABZIIVbCRMCzQQqEgAAAAAACQFnGzs/vgMqxbMZhDYWiEAAAGbDYadWahThKc3qjFNt9iItaKxmWPU1KaVZtecRHi++6B8mkpWni6miv8Om05cpT1Lkr8zS1N53Uea3npHWPy7eM++f4j+8fB950X0DhsOv6mhCL/ADWvN85vP4mlbUtbrLze43u43H+reZ93d5dHpFGqAAAAABpdIdE0K6tWown+9FNrlLWuwtW9q9JZ9Dc62hOdO0x8JfE9O+TSDTlhaji/yVG3F8FLWu25t6e8mOVnoNp6R3r+XcVzHjHXy6eWHO+kejauHnoVqcoS3PU1vi1lJcUb9L1vGay9Rt9zpbinHp2zH318Gq2WbCAABMCWBAAAAAAAN3D0VFaT18Nlvhe/Zk0Y5nLV1NTinhhrV53d1y4ZblsXAvWMQz6dZiObGSuAAPU6u9B1cZVVKnktc5vVCO973uW34mPV1Y065lp77fae00vxL/KPGfvrLtHV/q/QwcNGlD1n+KbznPm93BZHJ1NW2pOZeA3m+1t3fi1J5d0d0ffi9RsxtNGj2AWiwJAAAAAA2BibuBrdK9E0cTT83WgpLZvi/wA0XsZel7UnNWfbbnV29+PSnE/v8XGOtvVueCq6LelTld0570tcZbpL6nV0daNSPe992Z2jTeaeY5WjrH8x7nhGZ0gAAA2aNJ3slefwiuPHw5lZlhveJjM9P3KycXozS5pK/NNCPcUxaM0lgqQs/Dii0TlkrbMKhYA2MOknnk8s8vtcylpywak8Ucla1W90tTd91+zYuBaIXpTHOWElkAAADtvk/wChlhsJBtevVSqT35r1Y9kfi2cjcanHf4PnvbO7ncbmcfpryj+Z+c/w+lMDlKoABKQEgAAACGwMcncC8YgWA8jrV0OsXhp0mlpW0qb3Tj+HlfU+DZk0tSaWiW72fu52u4rqd3Sfh3/24LJNOzVmtm47T6VE55wgAAA2o1nGWms01b4K6e53zK4zGGDgi1eCesNmvVVlOaTk16sdaSe1lYjuhhpWZnhr075ebKTbuzJEYbkRERiEBKUwiYzGGSrWckluVr7XuXIiIwpTTis5YiWRKQEAAN3oTB+exFKlbKdSEX+62tJ912U1LcNJlr7vW/B0L6nhEz8+76v0IlY4j5gkCGgCQEgAAAABElcCIxAsAAAcL684HzOOrRSsnLzi/wC4lJ24XbXYdjb24tOH0XsjW/F2dJnrEY8uX7PBMzpAAC8J2/VPUxMZVtWJROTbuxEYTEREYhUJAAAAAAtr5+IR0VCX1Hk2oaWPpP8AIqkn/A4+Mka+7nGnLj9vX4dlaPGYj65/aHajkvAAAAAAAAAAAAAAAAHJ/K5QtiaU/wA1K3bGcs+6S7jpbKfyzD2no1qZ296eFv3iP6fCm49GtqCOqoSAAAAAAAAAAFtfPxCOj7TyTw/4yfChN/z01+pqbz9EfFwPSSf/AMtf90ftLrhzHiAAAAAAAAAAAAAAADmvlhhnhnwrfDzfzN/Zf5fJ6z0Ynlq/8f5c51G+9V1VCQAAAAAAAAAAAWSCH2/kllfF1L6/MS/9lM095+iPi896SRjbV/3R+0usnNeKAAAAAAAAAAAAAAAOceWF/wBl3/13/wAzf2P+Xy/l6r0Y66v/AB/lzbXz8fqb71nRUJAAAAAAAAAACyQQq2EvsfJbiYU8XNznGKdCSvJqKvp03a75GrvImaRjxcL0h076m1rFIzPFHT4S6p6Xw/tFH3kPmc3gt4PG+q6/sT5SelsP7RR95D5jgt4Hquv7E+UnpfD+0UfeQ+Y4LeB6rr+xPlJ6Xw/tFH3kPmOC3geq6/sT5Sel8P7RR95D5jgt4Hquv7E+UnpbD+0UfeQ+Y4LeB6rr+xPlJ6Xw/tFH3kPmOC3geq6/sT5Sel8P7RR95D5jgt4Hquv7E+UnpbD+0UfeQ+Y4LeCPVdf2J8pPS+H9oo+8h8xwW8E+q6/sT5Sel8P7RR95D5jgt4Hquv7E+UnpfD+0UfeQ+Y4LeB6rr+xPlJ6Xw/tFH3kPmOC3geq6/sT5SelsP7RR95D5jgt4Hquv7E+Uud+VrG06jw6p1ITsqt9GSla/m7XtyN7ZVmM5eo9G9G+nGpx1mM8PWMeLnxvPTra+fj9QjoqEgAAAAAAAEoCGwAAABLYMIAmMbuyQRMxEZlLVnn9/QiOaInMKkrAAABLYMIAASgYQAAAAJbBCAMlKk5atn2kRM4UveKsbJXgAAZ6NPNWV5PUti4srMsV7cp8I+8MuIhOFtJqSfbfg3rIjE9FKcF/08pa1SFrNanq38mWiWats8p6woSsAAAAAkCZw3qVNQV21fev0vybvttYxzMy1b2m84j7+/o1K09Jt/f05F4jDYpXhrhQlYAAAAGzQpO6S/E+6K135+HMrMsN7xMZnp+62IjODtO0k/j267kRieiKcN4zXlLXqQtq1PNcvtF4llrbKgWAAAABkpU7552Wt2ImVL34fi2qtRQSSz3cVmr8b5335W4UiMtetJvM5aJkbYAAzxm1oyjrjk+9/DOxX3SxTEZms97deITipzs9ejFb9TbKcPPENeNOeLgr85edUqOTu/ouCMsRht1rFYxCgWAAACUgTOGxQ9V53Tyd89Wu3bvKTza95m/Riq1L5LVe/N72WiGWlcc56sZK4AAAAAGzGq01OOxJPutnzK47mHhic0s26tdaKnNJya9WOxLeykR3QwVpM2mtenfLzZzbd2ZYjDciIiMQqEgAABelTcnZETOFb3isZlnU1FWcc7W3J5rXxy7UVxlh4ZtOYn7+/JrSlfWXZ4iIjEICQABMZNZoImImMSmc29f8AtyERgisR0VCQAAAASmETGWSrWcrcO982RFcKU04rzYiWQAAAAAABaE2tX3zExlFqxPVEpN5sRGCIiIxCAkAAAAExlYTCJjKZybd2IjBWIiMQqEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/2Q==";
  return axios
    .post(URl, PostBody)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.data["status"] == "fail") {
        console.table(res.data);
        if (res.data["message"].includes("E11000")) {
          FormHelper.errorToast("Email Already Exist!");
          return false;
        } else {
          FormHelper.errorToast("Something went wrong!");
        }
      } else {
        FormHelper.successToast("Registration Success!");
      }
    })
    .catch(() => {
      store.dispatch(HideLoader());
      FormHelper.errorToast("Something went wrong!");

      return false;
    });
}

//--------- Get Profile Request-----------//
export function GetProfileRequest() {
  store.dispatch(ShowLoader());
  const URl = BASE_URL + "/ProfileDetails";
  return axios
    .get(URl, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res["status"] === 200) {
        store.dispatch(setProfile(res.data["data"]));
      } else {
        FormHelper.errorToast("Failed to fetch profile!");
        return false;
      }
    })
    .catch(() => {
      store.dispatch(HideLoader());
      FormHelper.errorToast("Failed to fetch profile!");
      return false;
    });
}

//--------- Update Profile Request-----------//
export function UpdateProfileRequest(profileData) {
  store.dispatch(ShowLoader());
  const URl = BASE_URL + "/profileUpdate";
  const PostBody = profileData;
  const userData = profileData;
  return axios
    .post(URl, PostBody, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res["status"] === 200) {
        setUserData(userData);
        return true;
      } else {
        return false;
      }
    })
    .catch(() => {
      store.dispatch(HideLoader());
      FormHelper.errorToast("Failed to update profile!");
      return false;
    });
}

//--------- Send OTP to Email Request step: 1 -----------//
export function RecoverVerifyEmailRequest(email) {
  store.dispatch(ShowLoader());
  const URl = BASE_URL + "/RecoverVerifyEmail/" + email;

  return axios
    .get(URl)
    .then((res) => {
      store.dispatch(HideLoader());

      if (res["status"] === 200) {
        if (res.data["status"] == "success") {
          setEmail(email);
          FormHelper.successToast("A 6 Digit Code has been sent !");
          return true;
        }
      } else {
        FormHelper.errorToast("No user found!");
        return false;
      }
    })
    .catch(() => {
      store.dispatch(HideLoader());
      FormHelper.errorToast("Failed to change password!");
      return false;
    });
}

//--------- Verify OTP Request step:2 -----------//
export function RecoverVerifyOTPRequest(email, OTP) {
  store.dispatch(ShowLoader());
  const URl = BASE_URL + `/RecoverVerifyOTP/${email}/${OTP}`;

  return axios
    .get(URl)
    .then((res) => {
      store.dispatch(HideLoader());
      console.log(res);

      if (res["status"] === 200) {
        if (res.data.status === "success") {
          setOTP(OTP);
          FormHelper.successToast("Verification success!");
          return true;
        }
      } else {
        FormHelper.errorToast(res.data["data"]);
        return false;
      }
    })
    .catch(() => {
      store.dispatch(HideLoader());
      FormHelper.errorToast("Failed to change password!");
      return false;
    });
}

//--------- Change Password Request step: 3 -----------//
export function ChangePasswordRequest(email, OTP, password) {
  store.dispatch(ShowLoader());
  const URl = BASE_URL + "/RecoverResetPass";
  const PostBody = {
    email: email,
    code: OTP,
    password: password,
  };
  return axios
    .post(URl, PostBody, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res["status"] === 200) {
        if (res.data["status"] === "success") {
          FormHelper.successToast("Password has been changed!");
          return true;
        }
      } else {
        FormHelper.errorToast(res.data["data"]);
        return false;
      }
    })
    .catch(() => {
      store.dispatch(HideLoader());
      FormHelper.errorToast("Something wrong!");
      return false;
    });
}
