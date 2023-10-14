import {Button, List, Picker, DatePicker} from 'antd-mobile'
import yayJpg from '../../assets/yay.jpg';
import {connect, history} from "umi";
import styles from './styles.less'
import dayjs from "dayjs";
import {useEffect, useState} from "react";


const HomePage = (props) => {
  const {dispatch, city} = props
  const [selectedCity, setSelectCity] = useState('001')
  const [visible, setVisible] = useState(false)
  useEffect(() => {

  }, [])
  return (
    <div className={styles.home}>
      <List>
        <Picker
          title='选择城市'
          columns={[city]}
          // visible={visible}
          // onClose={() => {setVisible(false)}}
          // value={[selectedCity]}
          onSelect={(v, vv) => console.log(v, vv)}
        >
          {
            (_, {open}) => <List.Item onClick={open}>
              可选城市
            </List.Item>
          }
        </Picker>


        <DatePicker>
          {
            (_, {open}) => {
              console.log(dayjs(_).format('YYYY-MM-DD'))
              return <List.Item
                onClick={open}
                // extra={dayjs(_).format('YYYY-MM-DD')}
                extra='dsadsa'
              >
                选择时间
              </List.Item>
            }
          }
        </DatePicker>
      </List>
      <p>
        <img src={yayJpg} width='100%'/>
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
    </div>
  );
}

export default connect(({home}) => ({
  ...home
}))(HomePage)
