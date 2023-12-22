export const Tabs = () => {
    return (
        <div>
            <div className="mb-4 border-b border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab">
                    <li className="me-2" role="presentation">
                        <button className="inline-block p-4 border-b-2 rounded-t-lg" id="profile-tab" >All</button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300">In Progress</button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300" >Completed</button>
                    </li>
                </ul>
            </div>
            <div>
                <div className="hidden p-4 rounded-lg bg-gray-800" >
                    <p className="text-sm text-gray-400">This is some placeholder content the <strong className="font-medium text-white">Profile tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classNamees to control the content visibility and styling.</p>
                </div>
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                    <p className="text-sm text-gray-400">This is some placeholder content the <strong className="font-medium text-white">Dashboard tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classNamees to control the content visibility and styling.</p>
                </div>
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                    <p className="text-sm text-gray-400">This is some placeholder content the <strong className="font-medium text-white">Settings tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classNamees to control the content visibility and styling.</p>
                </div>
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="contacts" role="tabpanel" aria-labelledby="contacts-tab">
                    <p className="text-sm text-gray-400">This is some placeholder content the <strong className="font-medium text-white">Contacts tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classNamees to control the content visibility and styling.</p>
                </div>
            </div>

        </div>
    )
}
