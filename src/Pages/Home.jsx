import PrivateRoute from "./Private/Private";

const Home =() => {
    return (
        <div>
            <PrivateRoute> <h1>Home</h1></PrivateRoute>
       
        </div>
    );
    };
    export default Home;