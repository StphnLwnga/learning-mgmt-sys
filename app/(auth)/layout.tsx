/**
 * Renders the AuthLayout component.
 *
 * @param {Object} props - The properties of the AuthLayout component.
 * @param {React.ReactNode} props.children - The child elements to be rendered.
 * @return {JSX.Element} The rendered AuthLayout component.
 */
const AuthLayout = ({children}: {children: React.ReactNode}): JSX.Element => {
  return ( 
    <div className="h-full flex items-center justify-center">
      {children}
    </div>
  );
}
 
export default AuthLayout;