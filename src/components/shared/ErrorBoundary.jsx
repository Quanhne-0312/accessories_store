import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Application render error:', error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <main className="grid min-h-screen place-items-center bg-blue-gray-50 p-6">
                    <section className="w-full max-w-lg rounded-xl bg-white p-8 text-center shadow-lg">
                        <h1 className="text-2xl font-semibold text-blue-gray-900">Trang web gặp sự cố</h1>
                        <p className="mt-3 text-sm text-blue-gray-600">
                            Vui lòng tải lại trang. Nếu lỗi vẫn còn, hãy kiểm tra kết nối tới máy chủ.
                        </p>
                        <button
                            type="button"
                            className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                            onClick={this.handleReload}
                        >
                            Tải lại trang
                        </button>
                    </section>
                </main>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
