'use server'
import {prisma} from "@/lib/prisma"


// Function returns array of m projects that are currently proposed starting at the 
// nth record.
// Parameters:
// - n: Index to start result from query to return
// - m: Number of results to return.
// Example:
// const results = proposals(2, 2);
// Returns: The 2nd and 3rd projects proposed.
export async function proposals(n, m){
    
    return await prisma.project.findMany({
        skip: n,
        take: m,
        where:{
            status: {
                equals: 'proposed',
            },
        },
    })

}