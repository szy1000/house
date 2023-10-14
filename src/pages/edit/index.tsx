import {connect} from "umi";
import {Button, ImageUploader, Form, Input} from 'antd-mobile'
import {useEffect} from "react";
import './styles.less'

const Edit = (props) => {
  const {dispatch} = props

  const [form] = Form.useForm()
  useEffect(() => {
    dispatch({type: 'edit/pageInit'})
  }, [])


  const submit = async () => {
    const res = await form.validateFields()
    console.log(res)
  }
  return (
    <div className='edit'>
      <Form form={form}>
        <Form.Item label='头像' name='avatar'>
          <ImageUploader />
        </Form.Item>
        <Form.Item label='手机号' name='phone'>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item label='签名' name='sign'>
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
