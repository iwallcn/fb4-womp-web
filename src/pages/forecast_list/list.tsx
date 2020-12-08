import React, { useState, useContext, useEffect } from 'react';
import { Card, Table, Pagination, Divider, ResponsiveGrid, Button, Box, Form, Input, Icon, Loading, Select } from '@alifd/next';
import styles from './index.module.scss';
import { Link } from 'ice';
import globalContext from '@/contexts/globalContext';
import { getCountryCode } from '../../utils/index';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

// 从父组件传过来的数据：数据列表、更新page、更新formItem
const TableList = ({ dataSource, loading }) => {
  console.log(dataSource)
  const { setPage, setFormItem } = useContext(globalContext);
  const [expand, setExpand] = useState(false);
  const [countryList, setcountryList] = useState();

  // 获取国家列表
  useEffect(() => {
    let temp: any = []
    for (let key in getCountryCode) {
      let obj = {
        label: getCountryCode[key],
        value: key
      }
      temp.push(obj);
    }
    setcountryList(temp);
  }, [getCountryCode]);

  // 点击查询 value 是表单对象
  const handlerSearch = (value) => {
    setFormItem(value);
    setPage({
      pageNum: 1,
      pageSize: 10
    })
  };

  // 点击分页
  const onPaginationChange = (val) => {
    setPage({
      pageNum: val,
      pageSize: 10
    })
  };

  // 点击展开收起
  const toggleSeachList = () => {
    setExpand(!expand);
  };

  return (
    <>
      <Card free>
        <Card.Content>
          <Box padding={10}>
            <Form responsive fullWidth labelAlign="top">
              <FormItem colSpan={3} label="产品编码">
                <Input
                  hasClear
                  placeholder="输入产品编码进行搜索"
                  name="productCode"
                />
              </FormItem>
              <FormItem colSpan={3} label="服务商单号">
                <Input placeholder="输入服务商单号搜索" name="deliveryNo" hasClear />
              </FormItem>
              <FormItem colSpan={3} label="客户单号">
                <Input placeholder="输入客户单搜索" name="customerHawbCode" hasClear />
              </FormItem>
              {expand && (
                <>
                  <FormItem colSpan={3} label="中转袋号">
                    <Input placeholder="输入中转袋号搜索" name="containerNo" hasClear />
                  </FormItem>
                  <FormItem colSpan={3} label="航空主单号">
                    <Input placeholder="输入航空主单号搜索" name="transportServiceNo" hasClear />
                  </FormItem>
                  <FormItem colSpan={3} label="目的地">
                    <Select dataSource={countryList} showSearch hasClear name="destination" placeholder="请选择" />
                  </FormItem>
                  <FormItem colSpan={3} label="4PX跟踪号">
                    <Input placeholder="输入4PX跟踪号搜索" name="fpxTrackingNo" hasClear />
                  </FormItem>
                </>
              )}
              <Cell colSpan={3} className={styles.btns}>
                <Box
                  spacing={8}
                  direction="row"
                  align="flex-end"
                  justify="center"
                  style={{ height: '100%' }}
                >
                  <Form.Submit type="primary" onClick={handlerSearch}>查询</Form.Submit>
                  <Form.Reset>重置</Form.Reset>
                  <Button onClick={toggleSeachList}>
                    {expand ? (
                      <>
                        收起 <Icon className={styles.icon} type="arrow-up" size="xs" />
                      </>
                    ) : (
                        <>
                          展开 <Icon className={styles.icon} type="arrow-down" size="xs" />
                        </>
                      )}
                  </Button>
                </Box>
              </Cell>
            </Form>
          </Box>
          <Divider dashed />
          <div className={styles.Main}>
            <Loading visible={loading} style={{ display: 'block' }}>
              {Object.keys(dataSource).length > 0 && (
                <>
                  <Table
                    hasBorder={false}
                    className={styles.Table}
                    dataSource={dataSource.tableData}
                  >
                    {Object.keys(dataSource.tableColumn).map((col) => (
                      <Table.Column title={dataSource.tableColumn[col]} dataIndex={col} key={col} />
                    ))}
                    {/* <Table.Column
                      title="操作"
                      lock="right"
                      cell={(value, index, record) => (
                        <div className={styles.opt}>
                          <a href={`/dispatch_parcel_detail/${record.logisticsOrderId}`} >详情</a>
                          <Divider direction="ver" />
                          <a href={`http://track.test.4px.com/#/result/0/${record.logisticsOrderId}`} >轨迹</a>
                        </div>
                      )}
                    /> */}
                  </Table>
                  <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
                    <div className={styles.total}>
                      共<span>{dataSource.total}</span>条需求
                    </div>
                    <Pagination onChange={onPaginationChange} total={dataSource.total} />
                  </Box>
                </>
              )}
            </Loading>
          </div>
        </Card.Content>
      </Card>
    </>
  );
};

export default TableList;
