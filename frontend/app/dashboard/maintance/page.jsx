'use client';
import React, {Fragment} from 'react'
import SummaryCard from '@/Components/admin/summary_card'
import Paginator from '@/Components/admin/paginator'
import { Dialog, Transition } from '@headlessui/react'
import { get_maintenance, get_maintenance_counts, update_maintenance } from '@/Utils/AdminServer/main_server';


export default function MaintainacePage() {
  const style = " px-2 py-1 font-semibold leading-tight rounded-full"
  const currentIndex = '1';
  let [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState([
    {
      id: 0,
      asignee: {fullname: ''},
      asset: {name: ''},
      type: '',
      priority: '',
      status: ''
    }
  ]);
  const [counts, setCounts] = React.useState({
    pending: 0,
    completed: 0,
    progress: 0
  });

  const update = (id, status) => {
    const body = {
      status: status,
    }
    update_maintenance(id, body).then((res) => {
      get_maintenance().then((res) => {
        setData(res);
      });
      get_maintenance_counts().then((res) => {
        setCounts(res);
      });
    });
  }

  React.useEffect(() => {
    get_maintenance().then((res) => {
      setData(res);
    });
    get_maintenance_counts().then((res) => {
      setCounts(res);
    });
  }, []);

  



  return (
    <div className='h-full overflow-y-auto'>
      {/* Main Page */}
      <div className="container px-6 mx-auto grid">
        <h1 className='font-bold text-xl'>
          Your Maintenance 
        </h1>
        <hr className="my-4"/>
        <div className="grid gap-6 mb-8 md:grid-cols-3">
          <SummaryCard 
              icon={<div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
              </svg>
            </div>} title='Complete Task' subtitle={counts.completed}/>
            <SummaryCard 
              icon={<div className="p-3 mr-4 text-slate-500 bg-slate-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
            </div>} title='Progress' subtitle={counts.progress}/>
          <SummaryCard 
              icon={<div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
              </svg>
          </div>} title='Pending Task' subtitle={counts.pending}/>
        </div>
        <hr className="my-4"/>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Asignee</th>
                  <th className="px-4 py-3">Asset</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
              {data.map(task=>(
                <tr key={task.id} className="text-gray-700">
                    <td className="px-4 py-3">
                        {task.id}
                    </td>
                    <td className="px-4 py-3 text-sm">
                        {task.asignee.fullname}
                    </td>
                    <td className="px-4 py-3 text-sm">
                        {task.asset.name}
                    </td>
                    <td className="px-4 py-3 text-xs">
                        <span className={task.priority==='High'?"text-orange-700 bg-green-100"+style:task.priority==='Medium'? "text-slate-700 bg-slate-100"+style
                            :"text-gray-700 bg-gray-100"+style}>
                            {task.priority}
                        </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                        {task.type}
                    </td>
                    <td className="px-4 py-3 text-xs">
                        <span className={task.status==='Completed'?"text-green-700 bg-green-100"+style:task.status==='Pending'? "text-orange-700 bg-orange-100"+style
                            :"text-gray-700 bg-gray-100"+style}>
                            {task.status}
                        </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                        <button onClick={()=>setIsOpen(true)} className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:bg-gray-600 focus:outline-none">
                            Edit
                        </button>
                        <Transition.Root show={isOpen} as={Fragment}>
                          <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                            <div className="fixed inset-0 z-10 overflow-y-auto">
                              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                              <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                              >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                  <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Edit Your Task Status
                                      </Dialog.Title>
                                      <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                          Are you sure you want to change the status of the task? The current state of the 
                                          task is <span className='font-bold'>{task.status}</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 space-x-2">
                                  {task.status !== 'Completed' && <button onClick={()=>update(task.id, 'Completed')} className="btn btn-outline btn-primary">Completed</button>}
                                  {task.status !== 'Pending' && <button onClick={()=>update(task.id, 'Pending')} className="btn btn-outline">Pending</button>}
                                  {task.status !== 'In Progress' && <button onClick={()=>update(task.id, 'In Progress')} className="btn btn-outline btn-accent">In Progress</button>}
                                </div>
                                </Dialog.Panel>
                              </Transition.Child>
                              </div>
                            </div>
                          </Dialog>
                        </Transition.Root>
                    </td>
                </tr>
                ))} 
              </tbody>
            </table>
          </div>
          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9">
            <span className="flex items-center col-span-3">
              Showing 21-30 of 100
            </span>
            <span className="col-span-2"></span>
            {/* Pagination */}
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Previous">
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20">
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                  <li>
                   <Paginator value='1' currentIndex={currentIndex}/>
                  </li>
                  <li>
                   <Paginator value='2' currentIndex={currentIndex}/>
                  </li>
                  <li>
                   <Paginator value='3' currentIndex={currentIndex}/>
                  </li>
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next"
                    >
                      <svg
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </span>
          </div>
        </div>
      </div>
      {/* Modal */}
    </div>
    
  )
}

