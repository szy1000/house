import {history} from "umi"
import {Button} from 'antd-mobile'

export default function My() {
  return (
    <div>
      <h2>Yay! My</h2>
      <Button onClick={() => history.push('/login')}>login</Button>
    </div>
  );
}
