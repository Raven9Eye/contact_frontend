// API 基础配置
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * 处理API响应
 * @param {Response} response - Fetch API响应对象
 * @returns {Promise} - 解析后的响应数据
 */
async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.json().catch(() => ({
            message: '请求失败'
        }));
        throw new Error(error.message || `HTTP错误! 状态码: ${response.status}`);
    }
    return response.json();
}

/**
 * 获取所有联系人
 * @returns {Promise<Array>} - 联系人列表
 */
async function getContacts() {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts`);
        return await handleResponse(response);
    } catch (error) {
        console.error('获取联系人失败:', error);
        throw error;
    }
}

/**
 * 获取单个联系人
 * @param {string} id - 联系人ID
 * @returns {Promise<Object>} - 联系人信息
 */
async function getContactById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts/${id}`);
        return await handleResponse(response);
    } catch (error) {
        console.error(`获取联系人ID: ${id} 失败:`, error);
        throw error;
    }
}

/**
 * 添加新联系人
 * @param {Object} contact - 联系人信息
 * @param {string} contact.name - 姓名
 * @param {string} contact.phone - 电话
 * @param {string} [contact.email] - 邮箱（可选）
 * @returns {Promise<Object>} - 创建的联系人信息
 */
async function addContact(contact) {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('添加联系人失败:', error);
        throw error;
    }
}

/**
 * 更新联系人
 * @param {string} id - 联系人ID
 * @param {Object} contact - 联系人信息
 * @param {string} contact.name - 姓名
 * @param {string} contact.phone - 电话
 * @param {string} [contact.email] - 邮箱（可选）
 * @returns {Promise<Object>} - 更新后的联系人信息
 */
async function updateContact(id, contact) {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(`更新联系人ID: ${id} 失败:`, error);
        throw error;
    }
}

/**
 * 删除联系人
 * @param {string} id - 联系人ID
 * @returns {Promise<Object>} - 删除结果
 */
async function deleteContact(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
            method: 'DELETE'
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(`删除联系人ID: ${id} 失败:`, error);
        throw error;
    }
}

/**
 * 搜索联系人
 * @param {string} keyword - 搜索关键词
 * @returns {Promise<Array>} - 搜索结果
 */
async function searchContacts(keyword) {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts/search?keyword=${encodeURIComponent(keyword)}`);
        return await handleResponse(response);
    } catch (error) {
        console.error(`搜索联系人关键词: ${keyword} 失败:`, error);
        throw error;
    }
}

// 将函数挂载到window对象，使其成为全局可用
window.getContacts = getContacts;
window.getContactById = getContactById;
window.addContact = addContact;
window.updateContact = updateContact;
window.deleteContact = deleteContact;
window.searchContacts = searchContacts;

// 模拟数据（用于开发环境）
const mockContacts = [
    { id: '1', name: '张三', phone: '13800138001', email: 'zhangsan@example.com' },
    { id: '2', name: '李四', phone: '13800138002', email: 'lisi@example.com' },
    { id: '3', name: '王五', phone: '13800138003' }
];

// 模拟数据函数（仅用于开发测试）
function getMockContacts() {
    console.log('获取模拟联系人列表:', mockContacts);
    return Promise.resolve(mockContacts);
}

function addMockContact(contact) {
    console.log('添加模拟联系人:', contact);
    const newContact = {
        id: Date.now().toString(),
        ...contact
    };
    console.log('创建的新联系人:', newContact);
    mockContacts.push(newContact);
    console.log('添加后的联系人列表长度:', mockContacts.length);
    console.log('更新后的联系人列表:', mockContacts);
    return Promise.resolve(newContact);
}

function updateMockContact(id, contact) {
    const index = mockContacts.findIndex(c => c.id === id);
    if (index !== -1) {
        mockContacts[index] = { ...mockContacts[index], ...contact };
        return Promise.resolve(mockContacts[index]);
    }
    throw new Error('联系人不存在');
}

function deleteMockContact(id) {
    const index = mockContacts.findIndex(c => c.id === id);
    if (index !== -1) {
        mockContacts.splice(index, 1);
        return Promise.resolve({ success: true });
    }
    throw new Error('联系人不存在');
}

// 将模拟数据函数挂载到window对象
window.getMockContacts = getMockContacts;
window.addMockContact = addMockContact;
window.updateMockContact = updateMockContact;
window.deleteMockContact = deleteMockContact;