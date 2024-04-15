import './profiletable.css';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

function ProfileTable(){
    
    return(
        <>
        <div className="tableOfProfiles">
            <table className="profilesTable">
                <tr>
                    <th className="profileTableColumn1">Username</th>
                    <th className="profileTableColumn2">Register Date</th>
                    <th className="profileTableColumn3">Status</th>
                    <th className="profileTableColumn4">Actions</th>
                </tr>
                <td colSpan={4}><hr className="hr2px"/></td>
                <tr>
                    <td>Account1 Name</td>
                    <td>23/04/2024</td>
                    <td>Active</td>
                    <td><Dropdown menu={{items,}}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Hover me
                                <DownOutlined />
                            </Space>
                        </a></Dropdown>
                    </td>
                </tr>
                <td colSpan={4}><hr className="hr1px"/></td>
            </table>
        </div>
        </>
    );
}

const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          View account
        </a>
      ),
      disabled: false,
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Update account
        </a>
      ),
      disabled: false,
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Suspend account
        </a>
      ),
      disabled: false,
    },
    {
      key: '4',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Reactivate account (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '5',
      danger: true,
      label: 'Delete account',
    },
  ];  

export default ProfileTable;