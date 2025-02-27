
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Save, Trash2, Edit, Upload } from 'lucide-react';
import { services } from '@/data/services';
import { supabase } from '@/lib/supabase';

interface ServiceFormData {
  id?: number;
  title: string;
  description: string;
  slug: string;
  image: string;
  imageFile: File | null;
}

export default function ServicesEditor() {
  const [servicesList, setServicesList] = useState(services);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<ServiceFormData>({
    title: '',
    description: '',
    slug: '',
    image: '',
    imageFile: null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setCurrentService({
      title: '',
      description: '',
      slug: '',
      image: '',
      imageFile: null
    });
    setImagePreview(null);
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCurrentService({
        ...currentService,
        imageFile: file
      });
      
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImagePreview(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditService = (service: any) => {
    setCurrentService({
      id: service.id,
      title: service.title,
      description: service.description,
      slug: service.slug,
      image: service.image,
      imageFile: null
    });
    setImagePreview(service.image);
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = currentService.image;
      
      // Upload new image if selected
      if (currentService.imageFile) {
        const fileExt = currentService.imageFile.name.split('.').pop();
        const fileName = `services/${currentService.slug}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('admin-uploads')
          .upload(fileName, currentService.imageFile);
          
        if (uploadError) {
          throw new Error('Error uploading image');
        }
        
        const { data } = supabase.storage
          .from('admin-uploads')
          .getPublicUrl(fileName);
          
        imageUrl = data.publicUrl;
      }
      
      const updatedService = {
        id: currentService.id || servicesList.length + 1,
        title: currentService.title,
        description: currentService.description,
        slug: currentService.slug,
        image: imageUrl
      };
      
      if (isEditing) {
        // Update existing service
        const updatedServices = servicesList.map(service => 
          service.id === updatedService.id ? updatedService : service
        );
        setServicesList(updatedServices);
        toast({
          title: 'Service updated',
          description: 'The service has been updated successfully',
        });
      } else {
        // Add new service
        setServicesList([...servicesList, updatedService]);
        toast({
          title: 'Service added',
          description: 'The service has been added successfully',
        });
      }
      
      resetForm();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save service',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setServicesList(servicesList.filter(service => service.id !== id));
    toast({
      title: 'Service deleted',
      description: 'The service has been deleted successfully',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Services Management</h1>
        <p className="text-muted-foreground">Add and edit services</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Service' : 'Add New Service'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium">
                  Service Title
                </label>
                <Input
                  id="title"
                  value={currentService.title}
                  onChange={(e) => setCurrentService({...currentService, title: e.target.value})}
                  placeholder="Service title"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium">
                  Service Slug
                </label>
                <Input
                  id="slug"
                  value={currentService.slug}
                  onChange={(e) => setCurrentService({...currentService, slug: e.target.value})}
                  placeholder="service-slug"
                  className="mt-1"
                  required
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Used in URLs, use lowercase letters, numbers, and hyphens only
                </p>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={currentService.description}
                  onChange={(e) => setCurrentService({...currentService, description: e.target.value})}
                  placeholder="Service description"
                  className="mt-1"
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium">
                  Featured Image
                </label>
                <div className="mt-1 flex items-center">
                  <label className="flex cursor-pointer items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm hover:bg-accent">
                    <Upload className="mr-2 h-4 w-4" />
                    <span>{currentService.imageFile || currentService.image ? 'Change Image' : 'Upload Image'}</span>
                    <Input
                      id="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-input">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {isEditing ? 'Update Service' : 'Add Service'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Services List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {servicesList.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  No services yet
                </div>
              ) : (
                servicesList.map((service) => (
                  <div key={service.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 overflow-hidden rounded-md">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{service.title}</div>
                        <div className="text-xs text-muted-foreground">{service.slug}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditService(service)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
