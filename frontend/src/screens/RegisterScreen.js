import { register } from "../api/api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { showMessage } from "../utils";

const RegisterScreen = {
    after_render: () => {
        document.getElementById('register-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = await register({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            })
            if(data.error){
                showMessage(data.error)
            }
            else {
                showMessage(data.message);
                document.location.hash = '/signin'
            }
        })
    },

    render: () => {
        if(getUserInfo().name) {
            document.location.hash = '/';
        }

        return `
            <div class="form-container">
                <form id="register-form">
                    <ul class="form-items">
                        <li>
                            <h1>Tạo tài khoản</h1>
                        </li>
                        <li>
                            <label for="name">Name</label>
                            <input type="text" name="name" id="name" placeholder="name..."/>
                        </li>
                        <li>
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="@gmail.com"/>
                        </li>
                        <li>
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="password..."/>
                        </li>
                        <li>
                            <label for="repassword">Re-Enter Password</label>
                            <input type="password" name="repassword" id="repassword" placeholder="re-enter password..."/>
                        </li>
                        <li>
                            <button type="submit">Đăng Kí</button>
                        </li>
                    </ul>
                </form>
            </div>
        `;
    }
}

export default RegisterScreen;