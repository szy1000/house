import {NavBar, Form, Button, Input} from 'antd-mobile'
import {useState} from "react";
import {EyeInvisibleOutline, EyeOutline} from 'antd-mobile-icons'
import {history, Link} from "umi";
import styles from './styles.less'

const Register = () => {
  const [visible, setVisible] = useState(false)
  const back = () => {
    history.go(-1)
  }

  return (
    <div className={styles.register}>
      <NavBar
        onBack={back}
      >
        注册
      </NavBar>

      <div className={styles.content}>
        <Form layout='vertical'>
          <Form.Item label='用户名' name='username'>
            <Input placeholder='请输入用户名' clearable/>
          </Form.Item>
          <Form.Item
            label='密码'
            name='password'
            extra={
              <div>
                {!visible ? (
                  <EyeInvisibleOutline onClick={() => setVisible(true)}/>
                ) : (
                  <EyeOutline onClick={() => setVisible(false)}/>
                )}
              </div>
            }
          >
            <Input placeholder='请输入密码' clearable type={visible ? 'text' : 'password'}/>
          </Form.Item>
        </Form>
        <Button className={styles.btn} block color='primary'>立即注册</Button>
        <Link className={styles.link} to='/register'>登录</Link>
      </div>
    </div>
  );
}

export default Register
