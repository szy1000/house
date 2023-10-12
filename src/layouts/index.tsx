import {useState} from 'react'
import { Outlet, useLocation, history } from 'umi';
import { Badge, TabBar } from 'antd-mobile'
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
  console.log()

  const tabs = [
    {
      key: '/',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: 'msg',
      title: '消息',
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: '99+',
    },
    {
      key: 'my',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  return (
    <div className={styles.global}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <TabBar
        className={styles.navbar}
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
  );
}

export default Layout
