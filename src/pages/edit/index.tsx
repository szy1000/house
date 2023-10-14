import {connect} from "umi";
import {Button, ImageUploader, Form, Input} from 'antd-mobile'
import {useEffect, useState} from "react";
import './styles.less'

const Edit = (props) => {
  const {dispatch} = props

  const [fileList, setFileList] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
    dispatch({
      type: 'edit/pageInit',
      callback: res => {
        console.log(res)
        setFileList([{url: res.avatar}])
        form.setFieldsValue({
          // avatar: [res.avatar],
          ...res
        })
      }
    })
  }, [])

  const submit = async () => {
    const res = await form.validateFields()
    // console.log(res)
    if(res) {
      dispatch({
        type: 'edit/updateInfo',
        params: {
          avatar: fileList[0].url,
          ...res
        }
      })
    }
  }

  const upload = (file) => {
    console.log(file)
  //   await sleep(3000)
  //   return {
  //     url: URL.createObjectURL(file),
  //   }
  }
  console.log(fileList)

  return (
    <div className='edit'>

      <ImageUploader
        maxCount={1}
        value={fileList}
        onChange={(e) => {
          console.log(e)
          setFileList(e)
        }}
        select
        upload={upload}
        showUpload={fileList.length < 1}
      />
      <Form form={form}>

        <Form.Item
          label='手机号'
          name='phone'
          rules={[
            {required: true, message: '手机号不能为空'}
          ]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          label='签名'
          name='sign'
          rules={[
            {required: true, message: '签名不能为空'}
          ]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
      </Form>

      <div className="submit">
        <Button onClick={submit} block color='primary'>提交</Button>
      </div>
    </div>
  );
}

export default connect(({edit}) => ({
  ...edit
}))(Edit)
