import React, { useState, useEffect } from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import TableList from './list';
import api from './api';
import globalContext from '@/contexts/globalContext'
// import { getCountryCode, renderTime } from '../../utils';

const { Cell } = ResponsiveGrid;

const TableListPage = () => {
  const [dataSource, setDataSource] = useState({}); // 设置数据源
  const [page, setPage] = useState({ pageNum: 1, pageSize: 10 }); // 设置分页对象
  const [formItem, setFormItem] = useState({}); // 设置表单查询条件
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    // 获取列表数据
    api.getList({ ...page, ...formItem }).then(res => {
      setLoading(false)
      let result = res.data.data
      // result.map(val => {
      //   val.departure = getCountryCode[val.departure]
      //   val.destination = getCountryCode[val.destination]
      //   val.createTime = renderTime(val.createTime)
      // })
      setDataSource({
        tableData: result,
        tableColumn: {
          customerCode: '客户编码',
          destWarehouse: '目的仓',
          consignmentNo: '委托单号',
          refNo: '参考号',
          status: '状态',
          transportType: '运输方式',
          totalPackages: '预报总箱数',
          declaredValue: '申报价值',
          transportCompany: '运输公司',
          leaveDate: '离港日期',
          arriveDate: '到港日期',
          createTime: '创建预报时间'
        },
        total: res.data.total
      });
    });
  }, [page, formItem]); // 监听page和查询条件

  return (
    <ResponsiveGrid gap={16}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: '预报信息' }, { name: '自发客户预报信息' }]}
        />
      </Cell>

      <Cell colSpan={12}>
        <globalContext.Provider value={{
          setPage,
          setFormItem
        }}>
          <TableList
            dataSource={dataSource} loading={loading}
          />
        </globalContext.Provider>
      </Cell>
    </ResponsiveGrid>
  );
};

export default TableListPage;
