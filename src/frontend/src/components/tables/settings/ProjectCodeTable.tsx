import { t } from '@lingui/macro';
import { Text } from '@mantine/core';
import { useCallback, useMemo } from 'react';

import {
  openCreateApiForm,
  openDeleteApiForm,
  openEditApiForm
} from '../../../functions/forms';
import { useTableRefresh } from '../../../hooks/TableRefresh';
import { ApiPaths, apiUrl } from '../../../states/ApiState';
import { AddItemButton } from '../../buttons/AddItemButton';
import { TableColumn } from '../Column';
import { InvenTreeTable } from '../InvenTreeTable';
import { RowAction, RowDeleteAction, RowEditAction } from '../RowActions';

/**
 * Table for displaying list of project codes
 */
export function ProjectCodeTable() {
  const { tableKey, refreshTable } = useTableRefresh('project-code');

  const columns: TableColumn[] = useMemo(() => {
    return [
      {
        accessor: 'code',
        sortable: true,
        title: t`Project Code`
      },
      {
        accessor: 'description',
        sortable: false,
        title: t`Description`
      }
    ];
  }, []);

  const rowActions = useCallback((record: any): RowAction[] => {
    return [
      RowEditAction({
        onClick: () => {
          openEditApiForm({
            url: ApiPaths.project_code_list,
            pk: record.pk,
            title: t`Edit project code`,
            fields: {
              code: {},
              description: {}
            },
            onFormSuccess: refreshTable,
            successMessage: t`Project code updated`
          });
        }
      }),
      RowDeleteAction({
        onClick: () => {
          openDeleteApiForm({
            url: ApiPaths.project_code_list,
            pk: record.pk,
            title: t`Delete project code`,
            successMessage: t`Project code deleted`,
            onFormSuccess: refreshTable,
            preFormContent: (
              <Text>{t`Are you sure you want to remove this project code?`}</Text>
            )
          });
        }
      })
    ];
  }, []);

  const addProjectCode = useCallback(() => {
    openCreateApiForm({
      url: ApiPaths.project_code_list,
      title: t`Add project code`,
      fields: {
        code: {},
        description: {}
      },
      onFormSuccess: refreshTable,
      successMessage: t`Added project code`
    });
  }, []);

  const tableActions = useMemo(() => {
    let actions = [];

    actions.push(
      <AddItemButton onClick={addProjectCode} tooltip={t`Add project code`} />
    );

    return actions;
  }, []);

  return (
    <InvenTreeTable
      url={apiUrl(ApiPaths.project_code_list)}
      tableKey={tableKey}
      columns={columns}
      props={{
        rowActions: rowActions,
        customActionGroups: tableActions
      }}
    />
  );
}