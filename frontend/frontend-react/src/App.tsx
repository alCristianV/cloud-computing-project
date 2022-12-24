import { Post } from './Post/Post';
import {SignInPage} from './SignInPage/SignInPage'

function App() {
  return (
    <div className="App">
     {/* <SignInPage/> */}
     <Post username='test' title='title' body='HEllo' likesNumber={10} comments={['hello there', 'hi']}/>
    </div>
  );
}

export default App;
