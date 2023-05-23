<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product = new Product;
        $product->name = $request->input('name');
        $product->slug = $request->input('slug');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->point = $request->input('point');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('public/images'); // Store the image in the "public/images" directory
            $product->image_url = Storage::url($imagePath); // Set the image URL using the Storage facade
        }
        
        $product->save();

        return response()->json([
            'status'=> 200,
            'message'=> 'Product Added Successfully',
            'data' => $product, // Include the product data in the response
        ]);
    }

    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);

    $response = [
        'id' => $product->id,
        'name' => $product->name,
        'slug' => $product->slug,
        'description' => $product->description,
        'price' => $product->price,
        'point' => $product->point,
        'image_url' => $product->image_url,
        'created_at' => $product->created_at,
        'updated_at' => $product->updated_at,
        'updated_at' => $product->updated_at,
    ];

    return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       return Product::destroy($id);
    }   

    /**
     * Search for a name
     *
     * @param  str  $name
     * @return \Illuminate\Http\Response
     */
    public function search($name)
    {
        $products = Product::where('name', 'like', '%'.$name.'%')->get();

        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found'], 404);
        }
    
        return $products;
    }
}
