import {useState} from 'react'
import {Outlet, useLocation, history} from 'umi';
import {Badge, SafeArea, TabBar} from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UserOutline,
} from 'antd-mobile-icons'
import styles from './index.less'

const Layout = () => {
  const {pathname} = useLocation()
  const [activeKey, setActiveKey] = useState(pathname)

  const tabs = [
    {
      key: '/',
      title: '首页',
      icon: <AppOutline/>,
      // badge: Badge.dot,
    },
    // {
    //   key: 'msg',
    //   title: '消息',
    //   icon: (active: boolean) =>
    //     active ? <MessageFill /> : <MessageOutline />,
    //   // badge: '99+',
    // },
    {
      key: 'my',
      title: '我的',
      icon: <UserOutline/>,
    },
  ]
  // const judgement = () => {
  //   const isIphone =
  //
  //   console.log(11)
  // }

  return (
    <div className={styles.global}>
      <div className={styles.content}>
        <Outlet/>
      </div>
      <div
        className={styles.navbar}
        style={{
          // /iPhone/i.test(navigator.userAgent)
          paddingBottom:  /iPhone/i.test(navigator.userAgent) ? 20 : 0
        }}
      >
        <TabBar
          activeKey={activeKey}
          onChange={e => {
            setActiveKey(e)
            history.replace(e)
          }}
        >
          {tabs.map(item => (
            <TabBar.Item
              key={item.key}
              icon={item.icon}
              title={item.title}
              badge={item?.badge}
            />
          ))}
        </TabBar>
      </div>
    </div>
  );
}

export default Layout
