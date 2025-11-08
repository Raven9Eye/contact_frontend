// 不需要导入语句，因为API函数已经挂载到window对象上
// 使用模拟数据标志（开发环境设为true）
const USE_MOCK_DATA = true;

// DOM元素
const contactForm = document.querySelector('.contact-form');
const contactIdInput = document.getElementById('contact-id');
const contactNameInput = document.getElementById('contact-name');
const contactPhoneInput = document.getElementById('contact-phone');
const contactEmailInput = document.getElementById('contact-email');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const contactsContainer = document.getElementById('contacts-container');
const searchInput = document.getElementById('search-input');

/**
 * 显示消息
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型（success/error）
 */
function showMessage(message, type = 'success') {
    // 移除已存在的消息
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    contactForm.parentNode.insertBefore(messageElement, contactForm);
    
    // 3秒后自动移除消息
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

/**
 * 重置表单
 */
function resetForm() {
    contactIdInput.value = '';
    contactNameInput.value = '';
    contactPhoneInput.value = '';
    contactEmailInput.value = '';
    formTitle.textContent = '添加联系人';
    contactNameInput.focus();
}

/**
 * 填充表单
 * @param {Object} contact - 联系人信息
 */
function populateForm(contact) {
    contactIdInput.value = contact.id;
    contactNameInput.value = contact.name || '';
    contactPhoneInput.value = contact.phone || '';
    contactEmailInput.value = contact.email || '';
    formTitle.textContent = '编辑联系人';
    contactNameInput.focus();
}

/**
 * 渲染联系人列表
 * @param {Array} contacts - 联系人列表
 */
function renderContacts(contacts) {
    contactsContainer.innerHTML = '';
    
    if (contacts.length === 0) {
        contactsContainer.innerHTML = `
            <div class="empty-state">
                <p>暂无联系人，请添加新联系人</p>
            </div
        `;
        return;
    }
    
    contacts.forEach(contact => {
        const contactItem = document.createElement('div');
        contactItem.className = 'contact-item';
        contactItem.innerHTML = `
            <div class="contact-info">
                <div class="contact-name">${contact.name || '未命名'}</div>
                <div class="contact-details">
                    <span>电话: ${contact.phone || '未设置'}</span>
                    ${contact.email ? `\n<span>邮箱: ${contact.email}</span>` : ''}
                </div>
            </div>
            <div class="contact-actions">
                <button class="edit-btn" data-id="${contact.id}">编辑</button>
                <button class="delete-btn" data-id="${contact.id}">删除</button>
            </div
        `;
        contactsContainer.appendChild(contactItem);
    });
    
    // 绑定编辑和删除按钮事件
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', handleEditContact);
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteContact);
    });
}

/**
 * 加载联系人列表
 */
async function loadContacts() {
    console.log('开始加载联系人列表，使用模拟数据:', USE_MOCK_DATA);
    try {
        const contacts = USE_MOCK_DATA 
            ? await window.getMockContacts()
            : await window.getContacts();
        
        console.log('成功加载联系人列表，共', contacts.length, '个联系人');
        console.log('联系人数据:', contacts);
        
        renderContacts(contacts);
    } catch (error) {
        console.error('加载联系人失败:', error);
        showMessage('加载联系人失败，请稍后重试', 'error');
        // 显示模拟数据作为后备
        if (!USE_MOCK_DATA) {
            console.log('尝试加载模拟数据作为后备');
            const mockContacts = await window.getMockContacts();
            renderContacts(mockContacts);
        }
    }
}

/**
 * 验证表单
 * @returns {boolean} - 是否验证通过
 */
function validateForm() {
    console.log('开始验证表单');
    const name = contactNameInput.value.trim();
    const phone = contactPhoneInput.value.trim();
    
    console.log('表单数据:', { name, phone });
    
    if (!name) {
        console.log('验证失败: 姓名为空');
        showMessage('请输入姓名', 'error');
        contactNameInput.focus();
        return false;
    }
    
    if (!phone) {
        console.log('验证失败: 电话为空');
        showMessage('请输入电话号码', 'error');
        contactPhoneInput.focus();
        return false;
    }
    
    // 简单的电话号码验证（中国手机号）
    const phoneRegex = /^1[3-9]\d{9}$/;
    console.log('电话号码验证:', phone, phoneRegex.test(phone));
    if (!phoneRegex.test(phone)) {
        console.log('验证失败: 电话号码格式不正确');
        showMessage('请输入有效的手机号码', 'error');
        contactPhoneInput.focus();
        return false;
    }
    
    // 邮箱验证（如果填写）
    const email = contactEmailInput.value.trim();
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('验证失败: 邮箱格式不正确');
            showMessage('请输入有效的邮箱地址', 'error');
            contactEmailInput.focus();
            return false;
        }
    }
    
    console.log('表单验证通过');
    return true;
}

/**
 * 处理保存联系人
 */
async function handleSaveContact() {
    console.log('开始处理保存联系人');
    
    if (!validateForm()) {
        console.log('表单验证失败，取消保存');
        return;
    }
    
    const id = contactIdInput.value;
    const contact = {
        name: contactNameInput.value.trim(),
        phone: contactPhoneInput.value.trim(),
        email: contactEmailInput.value.trim() || undefined
    };
    
    console.log('准备保存联系人:', { id, contact, USE_MOCK_DATA });
    
    try {
        if (id) {
            // 更新联系人
            console.log('执行更新联系人操作');
            if (USE_MOCK_DATA) {
                console.log('使用模拟数据更新联系人');
                await window.updateMockContact(id, contact);
            } else {
                await window.updateContact(id, contact);
            }
            showMessage('联系人更新成功');
        } else {
            // 添加新联系人
            console.log('执行添加新联系人操作');
            if (USE_MOCK_DATA) {
                console.log('使用模拟数据添加联系人');
                const newContact = await window.addMockContact(contact);
                console.log('成功添加联系人:', newContact);
            } else {
                await window.addContact(contact);
            }
            showMessage('联系人添加成功');
        }
        
        console.log('保存成功，重置表单并加载联系人');
        resetForm();
        loadContacts();
    } catch (error) {
        console.error('保存联系人失败:', error);
        showMessage(`保存失败: ${error.message || '未知错误'}`, 'error');
    }
}

/**
 * 处理编辑联系人
 * @param {Event} event - 点击事件
 */
async function handleEditContact(event) {
    const id = event.target.dataset.id;
    try {
        let contact;
        if (USE_MOCK_DATA) {
            const contacts = await window.getMockContacts();
            contact = contacts.find(c => c.id === id);
        } else {
            contact = await window.getContactById(id);
        }
        
        if (contact) {
            populateForm(contact);
        } else {
            showMessage('联系人不存在', 'error');
        }
    } catch (error) {
        console.error('编辑联系人失败:', error);
        showMessage('编辑失败，请稍后重试', 'error');
    }
}

/**
 * 处理删除联系人
 * @param {Event} event - 点击事件
 */
async function handleDeleteContact(event) {
    const id = event.target.dataset.id;
    
    if (!confirm('确定要删除这个联系人吗？')) {
        return;
    }
    
    try {
        if (USE_MOCK_DATA) {
            await window.deleteMockContact(id);
        } else {
            await window.deleteContact(id);
        }
        showMessage('联系人删除成功');
        loadContacts();
    } catch (error) {
        console.error('删除联系人失败:', error);
        showMessage(`删除失败: ${error.message || '未知错误'}`, 'error');
    }
}

/**
 * 处理搜索
 */
async function handleSearch() {
    const keyword = searchInput.value.trim();
    
    if (!keyword) {
        loadContacts();
        return;
    }
    
    try {
        let results;
        if (USE_MOCK_DATA) {
            const contacts = await window.getMockContacts();
            results = contacts.filter(contact => 
                contact.name.includes(keyword) || 
                contact.phone.includes(keyword) ||
                (contact.email && contact.email.includes(keyword))
            );
        } else {
            results = await window.searchContacts(keyword);
        }
        renderContacts(results);
    } catch (error) {
        console.error('搜索失败:', error);
        showMessage('搜索失败，请稍后重试', 'error');
    }
}

/**
 * 初始化应用
 */
function initApp() {
    // 事件监听器
    saveBtn.addEventListener('click', handleSaveContact);
    cancelBtn.addEventListener('click', resetForm);
    searchInput.addEventListener('input', handleSearch);
    
    // 表单提交处理
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSaveContact();
    });
    
    // 加载联系人
    loadContacts();
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', initApp);