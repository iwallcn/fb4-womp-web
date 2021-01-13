import React, { useEffect, useContext } from 'react';
import { injectIntl } from 'react-intl';
import { Grid, Form, Select, Input, Field } from '@alifd/next';
import styles from './index.module.scss';
import PageHeader from '@/components/PageHeader';
import { convertDictByType } from '@/utils/index';
import globalContext from '@/contexts/globalContext'
const { Row, Col } = Grid;
const FormItem = Form.Item;
const formLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

export default injectIntl(({ intl }) => {
  const { lang } = useContext(globalContext); //语言包
  const searchField = Field.useField({ values: {} });
  const source = convertDictByType('ORDER_DATA_SOURCES')
  let temp: any = []
  for (let key in source) {
    let obj = {
      label: source[key].name,
      value: source[key].code
    }
    temp.push(obj);
  }
  const orderSource = temp

  // 提交
  const submit = () => {
    searchField.validate((errors, values) => {
      if (errors) {
        return;
      }
    });
  }

  useEffect(() => {
  }, []);

  const FormPage = (
    <div className={styles.Search}>
      <Form labelAlign="left" {...formLayout}>
        <Row>
          <Col span={8}>
            <FormItem required label="配置项名称" {...formItemLayout}>
              <Select dataSource={orderSource} name="destination" placeholder="请选择" style={{ width: '100%' }} />
            </FormItem>
          </Col>
        </Row>
        <h5 className={styles.Title_h5}>配置规则</h5>
        <div className={styles.rules}>
          <span>45GP&</span>
          <span><Input defaultValue={0} style={{ width: 80 }} /></span>
          <span>&lt;种类&gt;= </span>
          <span><Input defaultValue={50} style={{ width: 80 }} /></span>
          <span>&托盘=</span>
          <span><Input defaultValue={0} style={{ width: 80 }} /></span>
          <span>UNIT</span>
        </div>
        <div className={styles.rules}>
          <span>45GP&</span>
          <span><Input defaultValue={0} style={{ width: 80 }} /></span>
          <span>&lt;种类&gt;= </span>
          <span><Input defaultValue={50} style={{ width: 80 }} /></span>
          <span>&托盘=</span>
          <span><Input defaultValue={0} style={{ width: 80 }} /></span>
          <span>UNIT</span>
        </div>

        <Row gutter="8">
          <Col offset={1} span={1}>
            <Form.Submit
              type="primary"
              onClick={submit}
              validate>
              {lang['fb4.save']}
            </Form.Submit>
          </Col>
          <Col offset={1} span={1}>
            <Form.Reset >{lang['fb4.close']}</Form.Reset>
          </Col>
        </Row>
      </Form>
    </div>
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: '入库预约设置' }, { name: '新增UNIT配置' }]}
      />
      {FormPage}
    </>
  );
});

