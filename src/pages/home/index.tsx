import {Button} from 'antd-mobile'
import yayJpg from '../../assets/yay.jpg';
import {connect, history} from "umi";
import styles from './styles.less'

const HomePage = (props) => {
  const {dispatch} = props
  console.log(props)
  return (
    <div className={styles.home}>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388"/>
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>

      <Button onClick={() => history.push('/login')}>login</Button>
    </div>
  );
}

export default connect(({home}) => ({
  ...home
}))(HomePage)
