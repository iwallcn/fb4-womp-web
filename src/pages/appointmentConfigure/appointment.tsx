import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Grid, Field, Form, TreeSelect, Checkbox, Input } from '@alifd/next';
import styles from './index.module.scss';
import PageHeader from '@/components/PageHeader';
import { get_WH_ALL, get_LANG_PACK } from '@/utils/index';

const { Row, Col } = Grid;
const FormItem = Form.Item;
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

export default injectIntl(({ intl }) => {
  const searchField = Field.useField({ values: {} });
  const [lang, setLang] = useState([]);
  const [treeData, setTreeData] = useState([{}]);

  // 提交
  const submit = () => {
    searchField.validate((errors, values) => {
      if (errors) {
        return;
      }
    });
  }

  // 获取语言包，仓库数据
  useEffect(() => {
    setLang(get_LANG_PACK());
    setTreeData(get_WH_ALL()[0] && get_WH_ALL()[0].children);
  }, []);

  const FormPage = (
    <div className={styles.Search}>
      <Form field={searchField} labelAlign="left" {...formLayout}>
        <Row>
          <Col span={8}>
            <FormItem label={lang['fb4.warehouse']}>
              <TreeSelect
                hasClear
                showSearch
                placeholder={lang['fb4.warehouse.choose']}
                treeDefaultExpandAll
                dataSource={treeData}
                name="warehouseCode"
                style={{ width: '100%' }} />
            </FormItem>
          </Col>
        </Row>
        <h5 className={styles.Title_h5}>{lang['fb4.carrier.type.set']}</h5>

        <Row>
          <Col span={4} offset={1}>
            <FormItem colSpan={4}>
              <Checkbox value="" name="carrierTypeSelect1">{lang['fb4.carrier.4px']}</Checkbox>
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem required >
              <Input name="carrierType1"
                addonTextBefore={lang['fb4.days.in.advance']}
                addonTextAfter={lang['fb4.set.no.day.warehousing.reservation']} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={5}>
            <FormItem required >
              <Input name="maxAdvanceDay1"
                addonTextBefore={lang['fb4.maximum.number.days.book']}
                addonTextAfter={lang['fb4.set.no.day.warehousing.reservation']} />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={4} offset={1}>
            <FormItem colSpan={4}>
              <Checkbox value="" name="carrierTypeSelect2">{lang['fb4.customer.carrier']}</Checkbox>
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem required >
              <Input name="carrierType2"
                addonTextBefore={lang['fb4.days.in.advance']}
                addonTextAfter={lang['fb4.set.no.day.warehousing.reservation']} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={5}>
            <FormItem required >
              <Input name="maxAdvanceDay2"
                addonTextBefore={lang['fb4.maximum.number.days.book']}
                addonTextAfter={lang['fb4.set.no.day.warehousing.reservation']} />
            </FormItem>
          </Col>
        </Row>

        <h5 className={styles.title_h5}>履行时间设置</h5>
        <Row gutter="8">
          <Col span={4} offset={1}>
            <FormItem required >
              <Input name="start" addonTextAfter="min" />
            </FormItem>
          </Col>
          <Col span={1}>
            到
          </Col>
          <Col span={4}>
            <FormItem required >
              <Input name="end" addonTextAfter="min" />
            </FormItem>
          </Col>
        </Row>

        <h5 className={styles.title_h5}>可收货量设置</h5>

        <h5 className={styles.title_h5}>排仓预约量设置</h5>
        <Row>
          <Col offset={1} span={8}>
            <FormItem required >
              <Input name="count"
                addonTextBefore="排仓预约量"
                addonTextAfter="UNIT" />
            </FormItem>
          </Col>
        </Row>
        <h5 className={styles.title_h5}>不可约日期设置</h5>

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
        breadcrumbs={[{ name: '入库预约设置' }, { name: lang['fb4.appointment.set.add'] }]}
      />
      {FormPage}
    </>
  );
});
