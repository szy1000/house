import {history, connect, Link} from "umi"
import {Button, List, Toast, Image} from 'antd-mobile'
import {getItem, removeAllItem} from "@/utils/localstorage";
import {TOKEN} from "@/constants";
import {useEffect} from "react";
import './styles.less'

const My = (props) => {
  const {dispatch, username, sign, avatar} = props
  console.log(props)
  useEffect(() => {
    const token = getItem(TOKEN);
    if (token) {
      dispatch({
        type: 'my/getInfo',
        params: {}
      })
    }

  }, [])

  const logout = async () => {
    dispatch({
      type: 'my/logout',
      callback: () => {
        removeAllItem()
        Toast.show({
          icon: 'success',
          content: '退出成功'
        });
        history.replace('/login')
      }
    })
    // await
  }

  return (
    <div className='my'>
      <div className="header">
        <Image
          src={avatar || require('@/assets/images/yay.jpg')}
          width={100}
          height={100}
          fit='cover'
          style={{borderRadius: 50}}
        />
        <div className='control'>
          {
            username ? (
              <>
                <h2 className='name'>{username}</h2>
                <h3 className='sign'>{sign}</h3>
              </>
            ) : <Button onClick={() => history.push('/login')}>登录</Button>
          }
        </div>
        {
          username && <Link className='setting' to='/edit'>个人设置</Link>
        }
      </div>

      <List>
        <List.Item>订单列表</List.Item>
        <List.Item>测试连接</List.Item>
        <List.Item>用户协议</List.Item>
      </List>

      {username && (
        <div className='logout'>
          <Button onClick={logout} block color='danger'>退出登录</Button>
        </div>
      )}
    </div>
  );
}

export default connect(({my}) => ({
  ...my
}))(My)
