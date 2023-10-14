import {NavBar, Form, Button, Input} from 'antd-mobile'
import {useState} from "react";
import {EyeInvisibleOutline, EyeOutline} from 'antd-mobile-icons'
import {history, connect, Link} from "umi";
import styles from './styles.less'

const Login = (props) =>  {
  const {dispatch} = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const back = () => {
    history.go(-1)
  }

  const login = async () => {
    const res = await form.validateFields()
    dispatch({
      type: 'login/loginByPsd',
      params: res,
      callback: () => {
        history.replace('/')
      }
    })
  }
  return (
    <div className={styles.login}>
      <NavBar
        onBack={back}
      >
        登录
      </NavBar>

      <div className={styles.content}>
        <Form form={form} layout='vertical'>
          <Form.Item
            label='用户名'
            name='username'
            rules={[
              {required: true, message: '不能为空'},
            ]}
          >
            <Input placeholder='请输入用户名' clearable/>
          </Form.Item>
          <Form.Item
            label='密码'
            name='password'
            rules={[
              {required: true, message: '不能为空'},
            ]}
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
        <Button className={styles.btn} onClick={login} block color='primary'>登录</Button>
        <Link className={styles.link} to='/register'>立即注册</Link>
      </div>
    </div>
  );
}

export default connect(({login}) => ({
  ...login
}))(Login)
