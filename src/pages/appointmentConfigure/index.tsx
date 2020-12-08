import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory, Link } from 'ice';
import { ResponsiveGrid, Table, Field, Divider, Form, Loading, Box, Button, TreeSelect } from '@alifd/next';
import styles from './index.module.scss';
import PageHeader from '@/components/PageHeader';
import { get_WH_ALL, get_LANG_PACK, renderTime, convertDictByCode } from '@/utils/index';
import API from './api';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

export default injectIntl(({ intl }) => {
  const history = useHistory();

  const searchField = Field.useField({ values: {} });
  const [lang, setLang] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [treeData, setTreeData] = useState([{}]);
  const [loading, setLoading] = useState(true);

  const search = () => {
    searchField.validate((errors, values) => {
      getList(values);
    });
  }

  useEffect(() => {
    setLoading(true);
    (async () => {
      await setLang(get_LANG_PACK());
      await setTreeData(get_WH_ALL()[0] && get_WH_ALL()[0].children);
      await search();
    })();
  }, []);

  const getList = (props) => {
    let lan = get_LANG_PACK();
    API.getList(props.warehouseCode || '', '').then(res => {
      if (res.success && res.data.length) {
        res.data.map(val => {
          val.createTime = renderTime(val.createTime);
          val.carrier = `${convertDictByCode('CARRIER_TYPE', val.carrierType)}: ${val.advanceDay} 天`;
          val.enabled = val.enabled === 'Y' ? lan['fb4.enabled'] : lan['fb4.html.disable'];
        })
        setTableData(res.data);
      }
      setLoading(false);
    })
  }

  // const [tableColumn, setTableColumn] = useState({
  //   warehouseCode: lang['fb4.warehouse'],
  //   carrierType: lang['fb4.carrier.type.set'],
  //   advanceDay: '天数',
  //   createUser: '创建人',
  //   createTime: '创建时间',
  //   enabled: '状态'
  // });

  const Search = (
    <div className={styles.Search}>
      <Form field={searchField} responsive labelAlign="top">
        <FormItem colSpan={6} label={lang['fb4.warehouse']}>
          <TreeSelect
            hasClear
            showSearch
            placeholder={lang['fb4.warehouse.choose']}
            treeDefaultExpandAll
            dataSource={treeData}
            name="warehouseCode"
            style={{ width: '100%' }} />
        </FormItem>

        <Cell colSpan={3} className={styles.btns}>
          <Box
            spacing={8}
            direction="row"
            align="flex-end"
            justify="center"
            style={{ height: '100%' }}
          ><Form.Submit type="primary" onClick={() => search()}>{lang['fb4.search']}</Form.Submit></Box></Cell>
      </Form>
    </div>
  );

  const List = (
    <div className={styles.List}>
      <Loading visible={loading} style={{ display: 'block' }}>
        <div className={styles.add}>
          <Button type="primary" onClick={() => history.push('/appointmentConfigure/addPage')}>
            新增
          </Button>
          <Button type="primary" onClick={() => history.push('/appointment')}>
            我要预约
          </Button>
        </div>
        {Object.keys(tableData).length > 0 && (
          <>
            <Table
              hasBorder={false}
              className={styles.Table}
              dataSource={tableData}
            >
              {/* {Object.keys(tableColumn).map((col) => (
                <Table.Column title={tableColumn[col]} dataIndex={col} key={col} />
              ))} */}
              <Table.Column title={lang['fb4.warehouse']} dataIndex="warehouseCode" />
              <Table.Column title={lang['fb4.carrier.type.set']} dataIndex="carrier" />
              <Table.Column title={lang['fb4.cannot.appointment.date.set']} dataIndex="advanceDay" />
              <Table.Column title={lang['fb4.create.user']} dataIndex="createUser" />
              <Table.Column title={lang['fb4.create.time']} dataIndex="createTime" />
              <Table.Column title={lang['fb4.status']} dataIndex="enabled" />
              <Table.Column
                title={lang['fb4.operation']}
                cell={(value, index, record) => (
                  <div className={styles.opt}>
                    <Link to="">{lang['fb4.enabled']}</Link>
                    <Divider direction="ver" />
                    <Link to="">{lang['fb4.modify']}</Link>
                    <Divider direction="ver" />
                    <Link to="">详情</Link>
                  </div>
                )}
              />
            </Table>
          </>
        )}
      </Loading>
    </div>
  )

  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: '入库预约设置' }, { name: lang['fb4.appointment.set.manage'] }]}
      />
      {Search}
      {List}
    </>
  );
});
