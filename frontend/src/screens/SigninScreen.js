import { signin } from "../api/api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { redirectUser, showMessage } from "../utils";

const SigninScreen = {
    after_render: () => {
        document.getElementById('signin-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = await signin({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });
            if(data.error){
                showMessage(data.error)
            }
            else {
                setUserInfo({...data})
                redirectUser();
            }
        })
    },

    render: () => {
        if(getUserInfo().name) {
            redirectUser();
        }

        return `
            <div class="form-container">
                <form id="signin-form">
                    <ul class="form-items">
                        <li>
                            <h1>Đăng Nhập</h1>
                        </li>
                        <li>
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="...@gmail.com"/>
                        </li>
                        <li>
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="...password"/>
                        </li>
                        <li>
                            <button type="submit">Đăng Nhập</button>
                        </li>
                        <li>
                            <div class="register">
                                Tạo tài khoản mới?
                                <a href="/#/register">Đăng Ký</a>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        `;
    }
}

export default SigninScreen;