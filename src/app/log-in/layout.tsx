interface LayoutProps {
    children: React.ReactNode;
}

const LoginLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}
export default LoginLayout;