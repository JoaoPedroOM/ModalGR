import Form from "./components/Form"
import FormHeader from "./components/FormHeader"

const App = () => {
  return (
    <main className="bg-slate-50 min-h-screen lg:p-10 p-5">
      <div className="mx-auto container max-w-[650px] lg:px-10 px-2 py-6 border-slate-300 border-2 rounded-2xl">
        <FormHeader/>
        <Form/>
      </div>
    </main>
  )
}

export default App
