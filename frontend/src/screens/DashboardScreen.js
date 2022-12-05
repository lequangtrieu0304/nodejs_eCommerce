    import DashboardMenu from "../components/DashBoardMenu"

const DashboardScreen = {
    render: () => {
        return `
            <div class="dashboard"> 
                ${DashboardMenu.render({selected: 'dashboard'})}
                <div class="dashboard-content">
                    <h1>Dashboard</h1>
                    <ul class="summary-item">
                        <li>
                            <div class="summary-title color1">
                                <span><i class="fa fa-users"></i> Users</span>
                            </div>
                            <div class="summary-body">0</div>
                        </li>
                        <li>
                            <div class="summary-title color2">
                                <span><i class="fa-brands fa-first-order-alt"></i> Orders</span>
                            </div>
                            <div class="summary-body">0</div>
                        </li>
                        <li>
                            <div class="summary-title color3">
                                <span><i class="fa-solid fa-barcode"></i> Sales</span>
                            </div>
                            <div class="summary-body">0</div>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }
}

export default DashboardScreen;