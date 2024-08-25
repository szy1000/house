import {SafeArea, NavBar, Button} from 'antd-mobile'
import {history, useLocation} from "umi";
import styles from './styles.less'

const Result = () => {
  const {state: {data, params}} = useLocation()

  console.log(data)
  console.log(params?.bingType)

  // params?.bingType === '全额上网' 7% 可行
  // 9% 可行

  const back = () => {
    history.push('/invest')
  }

  const calc = () => {
    let num = 0
    try {
      num = parseFloat(data[6]?.value);
      if(params?.bingType === '全额上网') {
        if(num > 7) {
          return '可行'
        } else {
          return  '不可行'
        }
      } else {
        if(num > 9) {
          return '可行'
        } else {
          return  '不可行'
        }
      }

    } catch (e) {
      num = 0
    }
    return  ''
  }

  return (
    <div className={styles.page}>
      {/*<NavBar*/}
      {/*  className={styles.nav}*/}
      {/*  onBack={back}*/}
      {/*>*/}
      {/*  分析报告*/}
      {/*</NavBar>*/}

      <div className={styles.result}>
        <div>
          <div className={styles.title}>分析结果</div>
        </div>
        <div className={styles.score}>
          <div className={styles.scoreTitle}>总投资收益率： <span>{data[6]?.value}</span></div>
          <div
            className={styles.scoreValue}
            style={{
              color: calc() === '可行' ? '#00B050' : '#FF0000'
            }}
          >
            {calc()}
          </div>
        </div>
      </div>

      <div className={styles.resultItem}>
        <div className={styles.box}>
          <div className={styles.title}>分析报告</div>
        </div>
        {
          data?.map((v, k) => (
            <div
              className={styles.item}
              key={k}
              style={{
                display: (k > 9 || k === 0) ? 'none' : 'flex'
              }}>
              <div className={styles.label}>{v.name}</div>
              <div className={styles.val}>{v.value}</div>
            </div>
          ))
        }
      </div>


      <div className={styles.btn}>
        <Button
          color='primary'
          block
          onClick={() => history.replace('/invest')}
        >
          重新分析
        </Button>
      </div>
      <SafeArea position='bottom'/>
    </div>
  )
}

export default Result
