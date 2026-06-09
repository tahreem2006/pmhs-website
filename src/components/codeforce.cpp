 #include<iostream>
 #include<vector>
#include <algorithm> 
#include <climits>
using namespace std;

 bool check(int n,vector<int>& arr )
 {
    int maxi=INT_MIN;

        for(int i=1;i<n;i++)
        {
            if(arr[i]<arr[i-1])
            maxi=max(maxi,arr[i-1]-arr[i]);

        }
        if(maxi==INT_MIN)  return true;
        for(int i=1;i<n;i++)
        {
            if(arr[i]<arr[i-1]) arr[i]=arr[i]+maxi;

        }

        for(int i=1;i<n;i++)
        {
            if(arr[i]<arr[i-1]) return false;

        }

        return true;



 }

 int main()
 {
    int t;
    cin>>t ;
    for(int i=0;i<t;i++)
    {
        int n;
        cin>>n;
        vector<int> arr;

        for(int i=0;i<n;i++)
        {
            int temp;
            cin>>temp;
            arr.push_back(temp);


        }
             cout << (check(n, arr) ? "YES" : "NO") << endl;

           



    }

 }