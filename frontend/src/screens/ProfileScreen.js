import { update } from "../api/api";
import { clearUser, getUserInfo, setUserInfo } from "../localStorage";
import { showMessage } from "../utils";

const ProfileScreen = {
    after_render: () => {
        document.getElementById('signout-button').addEventListener('click', () => {
            clearUser();
            document.location.hash = '/';
        });

        document.getElementById('profile-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = await update({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            })
            if(data.error){
                showMessage(data.error)
            }
            else {
                showMessage(data.message);
                setUserInfo(data);
                document.location.hash = '/';
            }
        })
    },

    render: () => {
        const {name, email} = getUserInfo();
        if(!name) {
            document.location.hash = '/';
        }

        return `
            <div class="form-container">
                <form id="profile-form">
                    <ul class="form-items">
                        <li>
                            <h1>Thông tin</h1>
                        </li>
                        <li>
                            <label for="name">Name</label>
                            <input type="text" name="name" id="name" value="${name}"/>
                        </li>
                        <li>
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email" value="${email}"/>
                        </li>
                        <li>
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password"/>
                        </li>
                        <li>
                            <button type="submit">Cập Nhật</button>
                        </li>
                        <li>
                            <button type="button" id="signout-button" class="signout-button">Đăng Xuất</button>
                        </li>
                    </ul>
                </form>
            </div>
        `;
    }
}

export default ProfileScreen;