import AuthGuard from "@/components/AuthGuard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const AdminPage = () => {
  return (
    <AuthGuard requiredRole="admin">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Admin Portal</h1>
        <h2 className="text-3x1 font-bold mb-4">Welcome to Zenior!</h2>
       {/* <p>Manage users, view reports, and access admin tools.</p> */}

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <h3 className="text-3x1 font-bold mb-4"> GET STARTED: </h3>
        <p> 
            Click on your avatar in the right-hand corner, and head over to <b>My Profile </b>  
            to fill in your information. 
        </p>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        
        <h3 className="text-3x1 font-bold mb-4"> Navigating Zenior: </h3>
        <Accordion type="single" collapsible>
        <AccordionItem value="item-1"> 
        <AccordionTrigger className="italic"> Admin Dashboard </AccordionTrigger>
          <AccordionContent className="pl-5">
            View accessibility and user data reports and access admin tools. 
          </AccordionContent>
        </AccordionItem>  
        <AccordionItem value="item-2"> 
        <AccordionTrigger className="italic"> Manage Users </AccordionTrigger>
          <AccordionContent className="pl-5">
           Delete, restrict, and edit users. 
          </AccordionContent>
        </AccordionItem> 
        </Accordion>

      </div>
    </AuthGuard>
  );
};

export default AdminPage;
