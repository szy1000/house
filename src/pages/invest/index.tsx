import {SafeArea, Form, Button, Input,NumberKeyboard, VirtualInput, Toast} from 'antd-mobile'
import {useState} from 'react';
import {connect} from "umi";
import styles from './styles.less'
import BnFormItem from "./components/BnFormItem";
import {queryAnalysisReq} from './service'
import {POWER_STATION_LIST, GRID_CONNECTED_TYPE, PROVINCE_LIST} from './config'

const Invest = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState({})
  const [data, setData] = useState([])

  const handleParams = (values) => {
    for(let key in values) {
      try {
        if(!['bingType','province','stationType', 'xlsx', 'name'].includes(key)) {
          values[key] = parseFloat(values[key])
        }
      } catch (e) {
        Toast.show({
          icon: 'fail',
          content: '请输入正确的数据',
        })
        console.log(e)
      }
    }
    return values

    // debugger
    // console.log(values)
  }

  const submitForm = async () => {



    const params = await form.validateFields()
    if (params) {


      try {
        Toast.show({
          icon: 'loading',
          content: '加载中…',
        })
        setLoading(true)

        // capacity
        // num29
        // num30:0.405
        // num49:0
        // num50:0
        // num52:1
        // price:"4.5"
        // rent55:"4.5"
        // syst:"4.5"



        const res = await queryAnalysisReq({
          // ...params,
          ...handleParams(params),
          stationType: params.stationType[0],
          xlsx: `${params.xlsx}.xlsx`,
          bingType: params.bingType[0],
          province: params.province[0],
          // num29: params.num29 / 100
        })
        if (res.code === 200) {
          setData(res.data)
          setParams(params)
          setTimeout(() => {
            window.scrollTo({
              top: 860,
              behavior: 'smooth'
            })
            Toast.clear()
          }, 300)
        } else {
          Toast.show({
            icon: 'fail',
            content: res.msg || '请输入正确的数据',
          })
        }
        setLoading(false)
      } catch (e) {
        Toast.clear()
        setLoading(false)
      }
    }


  }

  const calc = () => {
    let num = 0
    try {
      num = parseFloat(data[6]?.value);
      if (params?.bingType === '全额上网') {
        if (num > 7) {
          return '可行'
        } else {
          return '不可行'
        }
      } else {
        if (num > 9) {
          return '可行'
        } else {
          return '不可行'
        }
      }

    } catch (e) {
      num = 0
    }
    return ''
  }

  const formArr = [
    {label: '装机规模', name: 'capacity', unit: 'MW', required: true,},
    {label: '辐照小时数', name: 'syst', placeholder: '请输入PVsyst查询数据', unit: '小时', required: true,},
    // {label: '报价/单瓦投资(不含土地费用)', name: 'price', unit: '(元/W)', required: true,},
    {label: '自发自用消纳比例', name: 'num29', placeholder: '请输入0-100', unit: '%', required: true,},
    {label: '自用电电价', name: 'num30', unit: '元/kWh', required: true,},
    {label: '报价(不含土地费用)', name: 'price', placeholder: '请输入每瓦报价', unit: '元/W', required: true},
    {label: '屋顶租赁占用面积', name: 'num49', placeholder: '请输入亩or平方米', unit: '亩/m²', required: false,},
    {label: '屋顶租赁费用', name: 'num50', unit: '元/亩(m²)/年', required: false,},
    // {label: '年租赁费用', name: 'xx', unit: '万元/年', required: true,},
    {label: '年租赁费用n年一付', name: 'num52', unit: '年', required: false,},
    // {label: '土地使用税征税面积', name: 'num53', unit: 'm²', required: true,},
    // {label: '土地使用税征收标准', name: 'rent54', unit: '元/m²/年', required: true,},
    {
      label: '屋顶租赁费涨幅',
      name: 'rent55',
      unit: '%',
      // required: true,
      min: 0,
      max: 100,
      // step: 0.01,
    },
    {label: '屋顶租赁费调整频次', name: 'rent5', placeholder: '请输入几年调一次价', unit: '年/次', required: false,},
    // {label: '土地租金调整频次(年/次)', name: 'rent53', unit: '元/W', required: false, layout: 'vertical'},
  ]

  const unitArr = ['', 'MW', '元/Wp', '万元', '万kWh', '万元/年', '', '', '年', '年']


  return (
    <div
      className={styles.invest}
      style={{
        // /iPhone/i.test(navigator.userAgent)
        paddingBottom: /iPhone/i.test(navigator.userAgent) ? 30 : 20
      }}
    >
      <Form
        form={form}
        initialValues={{
          "name": "紫东园区光储项目",
          "xlsx": "bn-202407-v1",
          "stationType": ["屋顶式"],
          "bingType": ["自发自用余电上网"],
          "capacity": 3.5,
          "province": ["江苏"],
          "syst": 1351,
          "price": 2.9,
          "num29": 90.00,
          "num30": 0.405,
          "num49": 0,
          "num50": 0,
          "num52": 1,
          "num53": "44",
          "rent54": "55",
          "rent55": 0,
          "rent53": 0
        }}
        layout='horizontal'
        footer={
          <Button
            onClick={submitForm}
            block
            color='primary'
            loading={loading}
          >
            开始分析
          </Button>
        }
      >
        <Form.Item
          label='项目名称'
          name='name'
          className={styles.formItem}
          rules={[{required: true, message: '项目名称不能为空'}]}
        >
          <Input placeholder='请输入项目名称' clearable/>
        </Form.Item>

        <Form.Item
          label='分析版本'
          name='xlsx'
          className={styles.formItem}
          rules={[{required: true, message: '使用的模版不能为空'}]}
        >
          <Input disabled placeholder='请输入使用的模版' clearable/>
        </Form.Item>

        {/*<Form.Item*/}
        {/*  className={styles.formItem}*/}
        {/*  noStyle*/}
        {/*  shouldUpdate={(prevValues, curValues) =>*/}
        {/*    prevValues.type !== curValues.type*/}
        {/*  }*/}
        {/*>*/}
        {/*  {*/}
        {/*    ({getFieldValue, setFieldsValue}) => (*/}
        {/*      <Form.Item*/}
        {/*        label='场站类型'*/}
        {/*        name='type'*/}
        {/*        rules={[{required: true, message: '场站类型不能为空'}]}*/}
        {/*        trigger='onConfirm'*/}
        {/*        onClick={() => {*/}
        {/*          setPickerVisible(true)*/}
        {/*        }}*/}
        {/*        // arrow={*/}
        {/*        //   getFieldValue('type') ? (*/}
        {/*        //     <>{getFieldValue('type')}*/}
        {/*        //       <CloseCircleFill*/}
        {/*        //         style={{*/}
        {/*        //           color: 'var(--adm-color-light)',*/}
        {/*        //           fontSize: 14,*/}
        {/*        //         }}*/}
        {/*        //         onClick={e => {*/}
        {/*        //           e.stopPropagation()*/}
        {/*        //           setFieldsValue({type: null})*/}
        {/*        //         }}*/}
        {/*        //       />*/}
        {/*        //     </>*/}
        {/*        //   ) : (*/}
        {/*        //     true*/}
        {/*        //   )*/}
        {/*        // }*/}
        {/*      >*/}
        {/*        {getFieldValue('type') ? getFieldValue('type') : '请选择'}*/}
        {/*        <Picker*/}
        {/*          columns={[*/}
        {/*            POWER_STATION_LIST*/}
        {/*          ]}*/}
        {/*          visible={pickerVisible}*/}
        {/*          onClose={() => {*/}
        {/*            setPickerVisible(false)*/}
        {/*          }}*/}
        {/*          onConfirm={v => {*/}
        {/*            setFieldsValue({type: v})*/}
        {/*          }}*/}
        {/*        />*/}
        {/*      </Form.Item>*/}
        {/*    )*/}
        {/*  }*/}
        {/*</Form.Item>*/}

        <BnFormItem className={styles.formItem} title='场站类型' label='场站类型' name='stationType'
                    columns={POWER_STATION_LIST}/>
        <BnFormItem className={styles.formItem} title='并网类型' label='并网类型' name='bingType'
                    columns={GRID_CONNECTED_TYPE}/>
        <BnFormItem className={styles.formItem} title='选择省份' label='电站所在省份' name='province'
                    columns={PROVINCE_LIST}/>


        <div style={{height: 20, backgroundColor: '#f7f8f9'}}></div>
        {
          formArr.map((v, k) => (
            <Form.Item
              key={k}
              className={styles.formItem}
              layout={v.layout || 'horizontal'}
              name={v.name}
              label={v.label}
              rules={[{required: v.required, message: `${v.label}不能为空`}]}
              extra={v.unit}
            >
              <Input
                type='number'
                // pattern="number"
                {...v}
                clearable
                inputMode='decimal'
                placeholder={v.placeholder || `请输入`}
                // keyboard={<NumberKeyboard confirmText='确定' customKey={'.'} />}
              />
            </Form.Item>
          ))
        }
      </Form>


      {
        data.length > 0 && (
          <div>
            <div className={styles.result}>
              <div>
                <div className={styles.title}>分析结果 <span> ({params?.bingType})</span></div>

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
              <div className={styles.tips}>全额上网模式，≥7 %就是可行，其他两种是≥ 9%可行</div>
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
                    <div>
                      <div className={styles.val}>{v.value}</div>
                      {unitArr[k] && <div className={styles.unit}>{unitArr[k]}</div>}
                    </div>
                  </div>
                ))
              }
            </div>


            <div className={styles.btn}>
              <Button
                color='primary'
                block
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  })
                }}
              >
                重新分析
              </Button>
            </div>
          </div>
        )
      }
      <SafeArea position='bottom'/>
    </div>
  );
}

export default connect(({login}) => ({
  ...login
}))(Invest)
