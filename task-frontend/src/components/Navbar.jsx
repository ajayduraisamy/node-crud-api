import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
    return (
        <nav
            className="navbar shadow-sm"
            style={{
                background: "linear-gradient(90deg, #0f172a, #1e293b)",
                borderRadius: "12px",
                marginBottom: "20px"
            }}
        >
            <div className="container-fluid d-flex align-items-center justify-content-between px-4 py-2">

                <div className="d-flex align-items-center">
                    <span
                        style={{
                            fontSize: "22px",
                            fontWeight: "600",
                            color: "#38bdf8",
                            marginRight: "8px"
                        }}
                    >
                        ✅
                    </span>
                    <span className="navbar-brand mb-0 h4 text-light">
                        Task Manager
                    </span>
                </div>

                <div>
                    <span
                        className="badge"
                        style={{
                            background: "#38bdf8",
                            color: "#0f172a",
                            padding: "6px 10px",
                            borderRadius: "12px",
                            fontWeight: "600"
                        }}
                    >
                        PRO UI
                    </span>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
