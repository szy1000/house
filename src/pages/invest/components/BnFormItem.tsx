import {Form, Picker} from 'antd-mobile'
import {useState} from 'react';

 const BnFormItem = (props) => {
  const [pickerVisible, setPickerVisible] = useState(false)
  const {name, label, title, columns} = props

  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, curValues) =>
        prevValues[name] !== curValues[name]
      }
    >
      {
        ({getFieldValue, setFieldsValue}) => (
          <Form.Item
            label={label || 'label'}
            name={name}
            rules={[{required: true, message: `${label}不能为空`}]}
            trigger='onConfirm'
            {...props}
            onClick={() => {
              setPickerVisible(true)
            }}
            // arrow={
            //   getFieldValue('type') ? (
            //     <>{getFieldValue('type')}
            //       <CloseCircleFill
            //         style={{
            //           color: 'var(--adm-color-light)',
            //           fontSize: 14,
            //         }}
            //         onClick={e => {
            //           e.stopPropagation()
            //           setFieldsValue({type: null})
            //         }}
            //       />
            //     </>
            //   ) : (
            //     true
            //   )
            // }
          >
            {getFieldValue(name) ? getFieldValue(name) : '请选择'}
            <Picker
              columns={columns ? [columns] : [[]]}
              visible={pickerVisible}
              title={title || ''}
              onClose={() => {
                setPickerVisible(false)
              }}
              onConfirm={v => {
                setFieldsValue({[name]: v})
              }}
            />
          </Form.Item>
        )
      }
    </Form.Item>
  );
}

export default BnFormItem

