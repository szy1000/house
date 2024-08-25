import {List, Picker, Button, Toast} from 'antd-mobile'
import {connect, history} from "umi";
import styles from './styles.less'
import dayjs from "dayjs";
import {useEffect, useState} from "react";


const HomePage = (props) => {
  const {dispatch, city} = props
  useEffect(() => {

  }, [])


  return (
    <div className={styles.home}>
      <div className={styles.wrapper}>
        <div
          className={styles.item}
          onClick={() => history.push('/invest')}
        >
          <div className={styles.icon}></div>
          <p className={styles.name}>投资分析</p>
        </div>

        <div
          className={styles.item}
          onClick={() => Toast.show({
            content: '正在努力开发中...'
          })}
        >
          <div className={styles.icon}></div>
          <p className={styles.name}>宝能名片</p>
        </div>
      </div>



      {/*<List>*/}
      {/*  <Picker*/}
      {/*    title='选择城市'*/}
      {/*    columns={[city]}*/}
      {/*    // visible={visible}*/}
      {/*    // onClose={() => {setVisible(false)}}*/}
      {/*    // value={[selectedCity]}*/}
      {/*    onSelect={(v, vv) => console.log(v, vv)}*/}
      {/*  >*/}
      {/*    {*/}
      {/*      (_, {open}) => <List.Item onClick={open}>*/}
      {/*        可选城市*/}
      {/*      </List.Item>*/}
      {/*    }*/}
      {/*  </Picker>*/}


      {/*  <DatePicker>*/}
      {/*    {*/}
      {/*      (_, {open}) => {*/}
      {/*        console.log(dayjs(_).format('YYYY-MM-DD'))*/}
      {/*        return <List.Item*/}
      {/*          onClick={open}*/}
      {/*          // extra={dayjs(_).format('YYYY-MM-DD')}*/}
      {/*          extra='dsadsa'*/}
      {/*        >*/}
      {/*          选择时间*/}
      {/*        </List.Item>*/}
      {/*      }*/}
      {/*    }*/}
      {/*  </DatePicker>*/}
      {/*</List>*/}

    </div>
  );
}

export default connect(({home}) => ({
  ...home
}))(HomePage)
